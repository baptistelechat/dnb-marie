import { useCallback } from "react";
import type { FranceLeaderboardEntry } from "../types";

const STORAGE_KEY = "dnb-marie-france-map-leaderboard";
const MAX_ENTRIES = 10;

const load = (): FranceLeaderboardEntry[] => {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    ) as FranceLeaderboardEntry[];
  } catch {
    return [];
  }
};

const score = (e: FranceLeaderboardEntry) =>
  e.firstTryScore * 2 + (e.hintScore ?? 0);

const sort = (entries: FranceLeaderboardEntry[]): FranceLeaderboardEntry[] =>
  [...entries].sort(
    (a, b) => score(b) - score(a) || a.totalTimeSeconds - b.totalTimeSeconds,
  );

export const useLeaderboard = () => {
  const getEntries = useCallback(
    (): FranceLeaderboardEntry[] => sort(load()),
    [],
  );

  const addEntry = useCallback(
    (entry: FranceLeaderboardEntry): FranceLeaderboardEntry[] => {
      const updated = sort([...load(), entry]).slice(0, MAX_ENTRIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    },
    [],
  );

  return { getEntries, addEntry };
};
