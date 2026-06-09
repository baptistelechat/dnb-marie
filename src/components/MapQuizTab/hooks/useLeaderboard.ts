import { useCallback } from "react";
import type { LeaderboardEntry } from "../types";

const STORAGE_KEY = "dnb-marie-leaderboard";

export const useLeaderboard = () => {
  const getEntries = useCallback((): LeaderboardEntry[] => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
      ) as LeaderboardEntry[];
    } catch {
      return [];
    }
  }, []);

  const addEntry = useCallback(
    (entry: LeaderboardEntry): LeaderboardEntry[] => {
      const entries = getEntries();
      const score = (e: LeaderboardEntry) =>
        e.firstTryScore * 2 + (e.hintScore ?? 0);
      const updated = [...entries, entry]
        .sort(
          (a, b) =>
            score(b) - score(a) || a.totalTimeSeconds - b.totalTimeSeconds,
        )
        .slice(0, 10);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    },
    [getEntries],
  );

  return { getEntries, addEntry };
};
