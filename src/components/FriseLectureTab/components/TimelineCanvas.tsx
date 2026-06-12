import { Fragment, useState } from "react";
import type { HistoricalDate } from "../../../data/historicalDates";
import type { RangeWithLane } from "../utils/computeLanes";

const DISPLAY_START = 1913;
const DISPLAY_END = 1960;
const PX_PER_YEAR = 22;
const V_PAD = 24;
const AXIS_X = 380;
const LANE_W = 30;
const RANGE_W = 24;
const POINT_R = 7;
const MIN_POINT_SPACING = 32;
const TICK_CLEARANCE = 28;
const MIN_TEXT_BAR_HEIGHT = 60;
// right edge of point labels: just before the circle
const LABEL_RIGHT_EDGE = AXIS_X - POINT_R - 6;

const TICK_YEARS = [1914, 1920, 1925, 1930, 1935, 1940, 1945, 1950, 1955];

const FRENCH_MONTHS: Record<string, number> = {
  janvier: 1,
  février: 2,
  mars: 3,
  avril: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  août: 8,
  septembre: 9,
  octobre: 10,
  novembre: 11,
  décembre: 12,
};

const FRENCH_MONTHS_ENTRIES = Object.entries(FRENCH_MONTHS);

const getSubYear = (date: string, sortKey: number): number => {
  const lower = date.toLowerCase();
  for (const [name, num] of FRENCH_MONTHS_ENTRIES) {
    if (lower.includes(name)) return sortKey + (num - 0.5) / 12;
  }
  return sortKey;
};

const yearToY = (year: number): number =>
  V_PAD + (year - DISPLAY_START) * PX_PER_YEAR;

interface PointWithY {
  item: HistoricalDate;
  y: number;
}

const computePointPositions = (items: HistoricalDate[]): PointWithY[] => {
  const sorted = items.toSorted(
    (a, b) => getSubYear(a.date, a.sortKey) - getSubYear(b.date, b.sortKey),
  );
  const result: PointWithY[] = [];
  let lastY = -Infinity;
  for (const item of sorted) {
    const naturalY = yearToY(getSubYear(item.date, item.sortKey));
    let y = Math.max(naturalY, lastY + MIN_POINT_SPACING);
    // Push events below tick year badges when too close
    for (const tickYear of TICK_YEARS) {
      const tickY = yearToY(tickYear);
      if (y > tickY - TICK_CLEARANCE && y < tickY + TICK_CLEARANCE) {
        y = tickY + TICK_CLEARANCE;
      }
    }
    // Re-enforce min spacing after tick adjustment
    y = Math.max(y, lastY + MIN_POINT_SPACING);
    result.push({ item, y });
    lastY = y;
  }
  return result;
};

interface TimelineCanvasProps {
  points: HistoricalDate[];
  rangesWithLanes: RangeWithLane[];
  seen: Set<string>;
  colorMap: Map<string, string>;
  onToggle: (id: string) => void;
}

const TimelineCanvas = ({
  points,
  rangesWithLanes,
  seen,
  colorMap,
  onToggle,
}: TimelineCanvasProps) => {
  const [hoveredRangeId, setHoveredRangeId] = useState<string | null>(null);

  const canvasHeight =
    V_PAD + (DISPLAY_END - DISPLAY_START) * PX_PER_YEAR + V_PAD;

  const maxLane = rangesWithLanes.reduce(
    (max, { lane }) => Math.max(max, lane),
    0,
  );
  const canvasWidth = AXIS_X + 2 + (maxLane + 1) * LANE_W + RANGE_W + 20;

  const pointPositions = computePointPositions(points);

  return (
    <div
      className="relative select-none"
      style={{ height: canvasHeight, width: canvasWidth, margin: "0 auto" }}
    >
      {/* Axe vertical */}
      <div
        className="absolute"
        style={{
          left: AXIS_X,
          top: V_PAD,
          width: 2,
          height: (DISPLAY_END - DISPLAY_START) * PX_PER_YEAR,
          background: "linear-gradient(to bottom, #d1c4e9, #b39ddb)",
        }}
      />

      {/* Graduations et labels d'années — badges pills distincts */}
      {TICK_YEARS.map((year) => {
        const y = yearToY(year);
        return (
          <div key={year}>
            <div
              className="absolute"
              style={{
                left: AXIS_X - 8,
                top: y,
                width: 10,
                height: 1,
                background: "#b39ddb",
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                left: 0,
                right: `calc(100% - ${AXIS_X - 12}px)`,
                top: y - 7,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: "'Fredoka', system-ui, sans-serif",
                  color: "#7e57c2",
                  background: "#f3e8ff",
                  borderRadius: 6,
                  padding: "1px 5px",
                  lineHeight: 1.2,
                  border: "1px solid #e9d5ff",
                }}
              >
                {year}
              </span>
            </div>
          </div>
        );
      })}

      {/* Barres de périodes (ranges) — à droite de l'axe */}
      {rangesWithLanes.map(({ item, lane }) => {
        const y = yearToY(item.sortKey);
        const barHeight = Math.max(
          ((item.endSortKey ?? item.sortKey) - item.sortKey) * PX_PER_YEAR,
          6,
        );
        const barX = AXIS_X + 2 + lane * LANE_W + (LANE_W - RANGE_W) / 2;
        const color = colorMap.get(item.id) ?? "#c084fc";
        const isSeen = seen.has(item.id);
        const showText = barHeight >= MIN_TEXT_BAR_HEIGHT;
        const isHovered = hoveredRangeId === item.id;

        return (
          <Fragment key={item.id}>
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              onMouseEnter={() => setHoveredRangeId(item.id)}
              onMouseLeave={() => setHoveredRangeId(null)}
              className="absolute rounded-xl border-2 transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden flex items-center justify-center"
              style={{
                left: barX,
                top: y,
                width: RANGE_W,
                height: barHeight,
                background: isSeen ? `${color}cc` : `${color}33`,
                borderColor: isSeen ? color : `${color}66`,
                boxShadow: isHovered
                  ? `0 0 0 3px ${color}66, 0 2px 10px ${color}60`
                  : isSeen
                    ? `0 2px 8px ${color}80`
                    : "none",
              }}
              aria-label={`${isSeen ? "Décocher" : "Cocher"} : ${item.event} (${item.date})`}
              aria-pressed={isSeen}
              title={`${item.event} — ${item.date}`}
            >
              {showText && (
                <span
                  style={{
                    fontSize: 8.5,
                    fontFamily: "'Nunito', system-ui, sans-serif",
                    fontWeight: 700,
                    color: isSeen ? "#4a148c" : "#7e57c2",
                    writingMode: "vertical-rl",
                    pointerEvents: "none",
                    userSelect: "none",
                    overflow: "hidden",
                    maxHeight: barHeight - 4,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.event}
                </span>
              )}
            </button>

            {/* Tooltip au survol */}
            {isHovered && (
              <div
                className="absolute pointer-events-none"
                style={{
                  right: `calc(100% - ${barX}px)`,
                  top: y + barHeight / 2,
                  transform: "translateY(-50%)",
                  maxWidth: 200,
                  padding: "5px 8px",
                  background: "#faf5ff",
                  border: `1.5px solid ${color}`,
                  borderRadius: 10,
                  boxShadow: `0 2px 12px ${color}40, 0 1px 4px rgba(0,0,0,0.1)`,
                  fontSize: 8.5,
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontWeight: 700,
                  color: isSeen ? "#4a148c" : "#7e57c2",
                  textAlign: "right",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  lineHeight: 1.4,
                  zIndex: 50,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 8,
                    color: "#9575cd",
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  {item.date}
                </span>
                {item.event}
              </div>
            )}
          </Fragment>
        );
      })}

      {/* Pastilles et labels d'événements ponctuels */}
      {pointPositions.map(({ item, y }) => {
        const isSeen = seen.has(item.id);

        return (
          <div key={item.id}>
            {/* Label à gauche : "DATE — Intitulé" sur une seule ligne, aligné à droite */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: 0,
                right: `calc(100% - ${LABEL_RIGHT_EDGE}px)`,
                top: y - 15,
                textAlign: "right",
                fontSize: 11,
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  fontFamily: "'Fredoka', system-ui, sans-serif",
                  fontWeight: 700,
                  color: isSeen ? "#c084fc" : "#9575cd",
                }}
              >
                {item.date}
              </span>
              <span
                style={{
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  color: isSeen ? "#9575cd" : "#c4b5fd",
                }}
              >
                {" — "}
              </span>
              <span
                style={{
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontWeight: 600,
                  color: isSeen ? "#6a1b9a" : "#9e9e9e",
                }}
              >
                {item.event}
              </span>
            </div>
            {/* Cercle interactif sur l'axe */}
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              className="absolute rounded-full border-2 transition-all duration-300 active:scale-90 cursor-pointer"
              style={{
                width: POINT_R * 2,
                height: POINT_R * 2,
                left: AXIS_X - POINT_R,
                top: y - POINT_R,
                background: isSeen
                  ? "linear-gradient(135deg, #f9a8d4, #c084fc)"
                  : "white",
                borderColor: isSeen ? "#9575cd" : "#d1c4e9",
                boxShadow: isSeen ? "0 0 8px #c084fc60" : "none",
                zIndex: 10,
              }}
              aria-label={`${isSeen ? "Décocher" : "Cocher"} : ${item.event} (${item.date})`}
              aria-pressed={isSeen}
              title={`${item.event} — ${item.date}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TimelineCanvas;
