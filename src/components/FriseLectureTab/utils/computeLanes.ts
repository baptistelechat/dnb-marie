import type { HistoricalDate } from "../../../data/historicalDates";

export interface RangeWithLane {
  item: HistoricalDate;
  lane: number;
}

export const computeLanes = (items: HistoricalDate[]): RangeWithLane[] => {
  const ranges = items.filter((d) => d.type === "range");
  const sorted = [...ranges].sort((a, b) => a.sortKey - b.sortKey);
  const laneOccupancy: Array<Array<{ start: number; end: number }>> = [];
  const result: RangeWithLane[] = [];

  for (const item of sorted) {
    const start = item.sortKey;
    const end = item.endSortKey ?? item.sortKey;
    let assignedLane = -1;

    for (let l = 0; l < laneOccupancy.length; l++) {
      const hasConflict = laneOccupancy[l].some(
        (r) => start < r.end && end > r.start,
      );
      if (!hasConflict) {
        assignedLane = l;
        break;
      }
    }

    if (assignedLane === -1) {
      assignedLane = laneOccupancy.length;
      laneOccupancy.push([]);
    }

    laneOccupancy[assignedLane].push({ start, end });
    result.push({ item, lane: assignedLane });
  }

  return result;
};
