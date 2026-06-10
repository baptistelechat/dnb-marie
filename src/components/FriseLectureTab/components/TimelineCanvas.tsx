import type { HistoricalDate } from "../../../data/historicalDates";
import type { RangeWithLane } from "../utils/computeLanes";

const DISPLAY_START = 1913;
const DISPLAY_END = 1960;
const PX_PER_YEAR = 22;
const V_PAD = 24;
const AXIS_X = 300;
const LANE_W = 26;
const RANGE_W = 20;
const POINT_R = 7;
const MIN_POINT_SPACING = 18;
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

const getSubYear = (date: string, sortKey: number): number => {
  const lower = date.toLowerCase();
  for (const [name, num] of Object.entries(FRENCH_MONTHS)) {
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
  const sorted = [...items].sort(
    (a, b) => getSubYear(a.date, a.sortKey) - getSubYear(b.date, b.sortKey),
  );
  const result: PointWithY[] = [];
  let lastY = -Infinity;
  for (const item of sorted) {
    const naturalY = yearToY(getSubYear(item.date, item.sortKey));
    const y = Math.max(naturalY, lastY + MIN_POINT_SPACING);
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
  const canvasHeight =
    V_PAD + (DISPLAY_END - DISPLAY_START) * PX_PER_YEAR + V_PAD;
  const pointPositions = computePointPositions(points);

  return (
    <div
      className="relative w-full select-none"
      style={{ height: canvasHeight }}
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

      {/* Graduations et labels d'années */}
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
                top: y - 6,
                textAlign: "right",
                fontSize: 8,
                fontWeight: 700,
                fontFamily: "'Fredoka', system-ui, sans-serif",
                color: "#b39ddb",
                whiteSpace: "nowrap",
              }}
            >
              {year}
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
        const showText = barHeight > 36;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            className="absolute rounded-xl border-2 transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden flex items-center justify-center"
            style={{
              left: barX,
              top: y,
              width: RANGE_W,
              height: barHeight,
              background: isSeen ? `${color}cc` : `${color}33`,
              borderColor: isSeen ? color : `${color}66`,
              boxShadow: isSeen ? `0 2px 8px ${color}80` : "none",
            }}
            aria-label={`${isSeen ? "Décocher" : "Cocher"} : ${item.event} (${item.date})`}
            aria-pressed={isSeen}
            title={`${item.event} — ${item.date}`}
          >
            {showText && (
              <span
                style={{
                  fontSize: 7,
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
                top: y - 8,
                textAlign: "right",
                fontSize: 9,
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
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
