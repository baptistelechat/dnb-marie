import { useCallback } from "react";
import type { OrdonnerLeaderboardEntry } from "../types";

const STORAGE_KEY = "dnb-histoire-ordonner-leaderboard";
const MAX_ENTRIES = 10;

export const useOrdonnerLeaderboard = () => {
  const getEntries = useCallback((): OrdonnerLeaderboardEntry[] => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
      ) as OrdonnerLeaderboardEntry[];
    } catch {
      return [];
    }
  }, []);

  const addEntry = useCallback(
    (entry: OrdonnerLeaderboardEntry): OrdonnerLeaderboardEntry[] => {
      const all = getEntries();
      const updated = [...all, entry]
        .sort(
          (a, b) =>
            b.freeScore - a.freeScore ||
            a.totalTimeSeconds - b.totalTimeSeconds,
        )
        .slice(0, MAX_ENTRIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    },
    [getEntries],
  );

  return { getEntries, addEntry };
};
