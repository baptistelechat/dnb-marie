import { useState } from "react";
import type { GameItem } from "../types";
import DropZone from "./DropZone";

const PX_PER_YEAR = 22;
const V_PAD = 24;
const LANE_W = 30;
const RANGE_W = 24;
const POINT_R = 7;
const MIN_POINT_SPACING = 32;

const AXIS_X = 200;
const LABEL_RIGHT_EDGE = AXIS_X - POINT_R - 6;

const TICK_YEARS = [1914, 1920, 1925, 1930, 1935, 1940, 1945, 1950, 1955];

const CANDY_COLORS = [
  "#f9a8d4",
  "#c084fc",
  "#818cf8",
  "#67e8f9",
  "#86efac",
  "#fde68a",
];

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

const computeLaneMap = (items: GameItem[]): Map<string, number> => {
  const ranges = items
    .filter((i) => i.type === "range")
    .sort((a, b) => a.sortKey - b.sortKey);
  const laneMap = new Map<string, number>();
  const laneOccupancy: Array<Array<{ start: number; end: number }>> = [];
  for (const item of ranges) {
    const start = item.sortKey;
    const end = item.endSortKey ?? item.sortKey;
    let lane = -1;
    for (let l = 0; l < laneOccupancy.length; l++) {
      if (!laneOccupancy[l].some((r) => start < r.end && end > r.start)) {
        lane = l;
        break;
      }
    }
    if (lane === -1) {
      lane = laneOccupancy.length;
      laneOccupancy.push([]);
    }
    laneOccupancy[lane].push({ start, end });
    laneMap.set(item.id, lane);
  }
  return laneMap;
};

// Points positionnés à leur année naturelle (pas de TICK_CLEARANCE dans le jeu —
// le label ne montre que la date courte, le décalage créerait de la confusion)
const computePointYMap = (
  pointItems: GameItem[],
  yearToY: (y: number) => number,
): Map<string, number> => {
  const sorted = [...pointItems].sort(
    (a, b) => getSubYear(a.date, a.sortKey) - getSubYear(b.date, b.sortKey),
  );
  const yMap = new Map<string, number>();
  let lastY = -Infinity;
  for (const item of sorted) {
    const y = Math.max(
      yearToY(getSubYear(item.date, item.sortKey)),
      lastY + MIN_POINT_SPACING,
    );
    yMap.set(item.id, y);
    lastY = y;
  }
  return yMap;
};

// Hauteurs estimées pour l'anti-collision
const LABEL_H = 17; // fontSize 11 * lineHeight 1.4 + marge
const BADGE_H = 14; // fontSize 10 + padding badge
const LABEL_GAP = 3;

// Map unifiée : labels de tous les items (points + ranges), avec avoidance des badges
// – Ranges : label ancré en HAUT de la barre (date de début) — pas au centre
//   (évite que les grands ranges centralisent leur label dans la zone des autres events)
// – Points  : label 15px au-dessus du cercle
// – Badges de ticks : obstacles fixes résolus en avance (look-ahead)
const computeAllLabelsYMap = (
  items: GameItem[],
  yearToY: (y: number) => number,
  pointYMap: Map<string, number>,
  tickYears: number[],
): Map<string, number> => {
  // Obstacles fixes : zones occupées par les badges de graduation
  const badgeZones = tickYears.map((year) => ({
    top: yearToY(year) - 7,
    bottom: yearToY(year) - 7 + BADGE_H,
  }));

  const labels = items.map((item) => {
    let naturalTop: number;
    if (item.type === "point") {
      const y = pointYMap.get(item.id) ?? yearToY(item.sortKey);
      naturalTop = y - 15;
    } else {
      // Ancré sur la date de DÉBUT (haut de la pilule)
      naturalTop = yearToY(item.sortKey) - 8;
    }
    return { id: item.id, naturalTop };
  });

  labels.sort((a, b) => a.naturalTop - b.naturalTop);

  const yMap = new Map<string, number>();
  let lastBottom = -Infinity;

  for (const { id, naturalTop } of labels) {
    // 1. Pousser après le bas du dernier label
    let top = Math.max(naturalTop, lastBottom + LABEL_GAP);

    // 2. Résoudre les collisions avec les badges (look-ahead itératif)
    let changed = true;
    while (changed) {
      changed = false;
      for (const zone of badgeZones) {
        if (top < zone.bottom && top + LABEL_H > zone.top) {
          top = zone.bottom + LABEL_GAP;
          changed = true;
        }
      }
    }

    yMap.set(id, top);
    lastBottom = top + LABEL_H;
  }

  return yMap;
};

interface GameTimelineProps {
  items: GameItem[];
}

const GameTimeline = ({ items }: GameTimelineProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sortKeys = items.flatMap((i) => [i.sortKey, i.endSortKey ?? i.sortKey]);
  const displayStart = Math.min(...sortKeys) - 3;
  const displayEnd = Math.max(...sortKeys) + 5;

  const yearToY = (year: number) => V_PAD + (year - displayStart) * PX_PER_YEAR;

  const relevantTickYears = TICK_YEARS.filter(
    (y) => y >= displayStart && y <= displayEnd,
  );

  const laneMap = computeLaneMap(items);
  const maxLane =
    laneMap.size > 0 ? Math.max(...Array.from(laneMap.values())) : 0;
  const canvasWidth = AXIS_X + 2 + (maxLane + 1) * LANE_W + RANGE_W + 24;

  const pointItems = items.filter((i) => i.type === "point");
  const rangeItems = items.filter((i) => i.type === "range");
  const pointYMap = computePointYMap(pointItems, yearToY);
  const allLabelsYMap = computeAllLabelsYMap(
    items,
    yearToY,
    pointYMap,
    relevantTickYears,
  );

  const colorMap = new Map<string, string>();
  rangeItems.forEach((item, i) => {
    colorMap.set(item.id, CANDY_COLORS[i % CANDY_COLORS.length]);
  });

  const hoveredItem = hoveredId ? items.find((i) => i.id === hoveredId) : null;
  const tooltipEl = hoveredItem
    ? (() => {
        const color =
          hoveredItem.type === "range"
            ? (colorMap.get(hoveredItem.id) ?? "#c084fc")
            : "#c084fc";
        let tooltipRight: number;
        let tooltipY: number;
        if (hoveredItem.type === "point") {
          tooltipRight = AXIS_X - POINT_R - 10;
          tooltipY =
            pointYMap.get(hoveredItem.id) ?? yearToY(hoveredItem.sortKey);
        } else {
          const lane = laneMap.get(hoveredItem.id) ?? 0;
          const barH = Math.max(
            ((hoveredItem.endSortKey ?? hoveredItem.sortKey) -
              hoveredItem.sortKey) *
              PX_PER_YEAR,
            6,
          );
          const barX = AXIS_X + 2 + lane * LANE_W + (LANE_W - RANGE_W) / 2;
          tooltipRight = barX - 8;
          tooltipY = yearToY(hoveredItem.sortKey) + barH / 2;
        }
        return (
          <div
            className="pointer-events-none"
            style={{
              position: "absolute",
              right: `calc(100% - ${tooltipRight}px)`,
              top: tooltipY,
              transform: "translateY(-50%)",
              maxWidth: 180,
              padding: "5px 8px",
              background: "#faf5ff",
              border: `1.5px solid ${color}`,
              borderRadius: 10,
              boxShadow: `0 2px 12px ${color}40, 0 1px 4px rgba(0,0,0,0.1)`,
              fontSize: 8.5,
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 700,
              color: "#4a148c",
              textAlign: "right",
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: 1.4,
              zIndex: 50,
            }}
          >
            <span
              style={{
                fontSize: 8,
                color: "#9575cd",
                display: "block",
                marginBottom: 2,
                fontWeight: 700,
              }}
            >
              {hoveredItem.date}
            </span>
            {hoveredItem.state === "correct" && hoveredItem.event}
          </div>
        );
      })()
    : null;

  const lastPointY =
    pointYMap.size > 0 ? Math.max(...Array.from(pointYMap.values())) : 0;
  const lastLabelY =
    allLabelsYMap.size > 0
      ? Math.max(...Array.from(allLabelsYMap.values()))
      : 0;
  const canvasHeight = Math.max(
    V_PAD + (displayEnd - displayStart) * PX_PER_YEAR + V_PAD,
    lastPointY + 32,
    lastLabelY + LABEL_H + 8,
  );

  return (
    <div className="relative select-none overflow-x-auto">
      <div
        style={{
          height: canvasHeight,
          width: canvasWidth,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Axe vertical */}
        <div
          style={{
            position: "absolute",
            left: AXIS_X,
            top: V_PAD,
            width: 2,
            height: (displayEnd - displayStart) * PX_PER_YEAR,
            background: "linear-gradient(to bottom, #d1c4e9, #b39ddb)",
          }}
        />

        {/* Graduations */}
        {relevantTickYears.map((year) => {
          const y = yearToY(year);
          return (
            <div key={year}>
              <div
                style={{
                  position: "absolute",
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

        {/* Ranges — pilules + label date ancré en haut */}
        {rangeItems.map((item) => {
          const lane = laneMap.get(item.id) ?? 0;
          const y = yearToY(item.sortKey);
          const barHeight = Math.max(
            ((item.endSortKey ?? item.sortKey) - item.sortKey) * PX_PER_YEAR,
            6,
          );
          const barX = AXIS_X + 2 + lane * LANE_W + (LANE_W - RANGE_W) / 2;
          const color = colorMap.get(item.id) ?? "#c084fc";

          return (
            <div key={item.id}>
              <DropZone
                item={item}
                x={barX}
                y={y}
                height={barHeight}
                color={color}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
              />
            </div>
          );
        })}

        {/* Points — cercles + label date */}
        {pointItems.map((item) => {
          const y = pointYMap.get(item.id) ?? yearToY(item.sortKey);
          const isCorrect = item.state === "correct";
          const labelTop = allLabelsYMap.get(item.id) ?? y - 15;

          return (
            <div key={item.id}>
              <div
                className="absolute pointer-events-none"
                style={{
                  left: 0,
                  right: `calc(100% - ${LABEL_RIGHT_EDGE}px)`,
                  top: labelTop,
                  textAlign: "right",
                  fontSize: 11,
                  lineHeight: 1.4,
                  whiteSpace: "normal",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fredoka', system-ui, sans-serif",
                    fontWeight: 700,
                    color: isCorrect ? "#c084fc" : "#9575cd",
                  }}
                >
                  {item.date}
                </span>
              </div>

              <DropZone
                item={item}
                x={AXIS_X}
                y={y}
                color="#c084fc"
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
              />

              {isCorrect && (
                <div
                  className="pointer-events-none"
                  style={{
                    position: "absolute",
                    left: AXIS_X + POINT_R + 6,
                    top: y - 8,
                    fontSize: 11,
                    fontFamily: "'Nunito', system-ui, sans-serif",
                    fontWeight: 600,
                    color: "#166534",
                    maxWidth: 90,
                    lineHeight: 1.4,
                    whiteSpace: "normal",
                  }}
                >
                  ✓ {item.event}
                </div>
              )}
            </div>
          );
        })}

        {tooltipEl}
      </div>
    </div>
  );
};

export default GameTimeline;
