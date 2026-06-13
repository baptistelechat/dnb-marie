import { useCallback } from "react";
import type {
  FranceCapitalsDirection,
  FranceCapitalsLeaderboardEntry,
} from "../types";

const STORAGE_KEY = "dnb-marie-france-capitals-leaderboard";
const MAX_ENTRIES = 10;

const load = (): FranceCapitalsLeaderboardEntry[] => {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    ) as FranceCapitalsLeaderboardEntry[];
  } catch {
    return [];
  }
};

const sort = (
  entries: FranceCapitalsLeaderboardEntry[],
): FranceCapitalsLeaderboardEntry[] =>
  entries.toSorted((a, b) => {
    const wa = a.firstTryScore * 2 + (a.hintScore ?? 0);
    const wb = b.firstTryScore * 2 + (b.hintScore ?? 0);
    return (
      wb - wa ||
      b.firstTryScore - a.firstTryScore ||
      a.totalTimeSeconds - b.totalTimeSeconds
    );
  });

export const useFranceCapitalsLeaderboard = () => {
  const getEntries = useCallback(
    (direction: FranceCapitalsDirection): FranceCapitalsLeaderboardEntry[] =>
      sort(load().filter((e) => e.direction === direction)),
    [],
  );

  const addEntry = useCallback(
    (
      entry: FranceCapitalsLeaderboardEntry,
    ): FranceCapitalsLeaderboardEntry[] => {
      const all = load();
      const updated = sort([...all, entry]).slice(0, MAX_ENTRIES * 2);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return sort(updated.filter((e) => e.direction === entry.direction)).slice(
        0,
        MAX_ENTRIES,
      );
    },
    [],
  );

  return { getEntries, addEntry };
};
