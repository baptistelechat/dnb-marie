import { useCallback } from "react";
import type { AssociationLeaderboardEntry } from "../types";

const STORAGE_KEY = "dnb-association-leaderboard";
const MAX_ENTRIES = 10;

export const useAssociationLeaderboard = () => {
  const getEntries = useCallback((): AssociationLeaderboardEntry[] => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
      ) as AssociationLeaderboardEntry[];
    } catch {
      return [];
    }
  }, []);

  const addEntry = useCallback(
    (entry: AssociationLeaderboardEntry): AssociationLeaderboardEntry[] => {
      const all = getEntries();
      const updated = [...all, entry]
        .sort(
          (a, b) =>
            b.firstTryScore - a.firstTryScore ||
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
