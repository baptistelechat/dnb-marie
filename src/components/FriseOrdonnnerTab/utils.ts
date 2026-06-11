import { HISTORICAL_DATES } from "../../data/historicalDates";
import type { GameItem } from "./types";

export const ROUND_SIZE = 6;

export const initGame = (): GameItem[] => {
  const shuffled = [...HISTORICAL_DATES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, ROUND_SIZE).map((d) => ({
    id: d.id,
    event: d.event,
    date: d.date,
    type: d.type,
    sortKey: d.sortKey,
    endSortKey: d.endSortKey,
    state: "idle" as const,
    firstTryFailed: false,
  }));
};
