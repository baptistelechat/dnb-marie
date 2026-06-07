import { useCallback } from "react";
import type { CapitalsDirection, CapitalsLeaderboardEntry } from "../types";

const STORAGE_KEY = "dnb-capitals-leaderboard";
const MAX_PER_DIRECTION = 10;

export const useCapitalsLeaderboard = () => {
  const getAllEntries = useCallback((): CapitalsLeaderboardEntry[] => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
      ) as CapitalsLeaderboardEntry[];
    } catch {
      return [];
    }
  }, []);

  const getEntries = useCallback(
    (direction: CapitalsDirection): CapitalsLeaderboardEntry[] => {
      return getAllEntries()
        .filter((e) => e.direction === direction)
        .sort(
          (a, b) =>
            b.firstTryScore - a.firstTryScore ||
            a.totalTimeSeconds - b.totalTimeSeconds,
        );
    },
    [getAllEntries],
  );

  const addEntry = useCallback(
    (entry: CapitalsLeaderboardEntry): CapitalsLeaderboardEntry[] => {
      const all = getAllEntries();
      const otherDirection = all.filter((e) => e.direction !== entry.direction);
      const sameDirection = [
        ...all.filter((e) => e.direction === entry.direction),
        entry,
      ]
        .sort(
          (a, b) =>
            b.firstTryScore - a.firstTryScore ||
            a.totalTimeSeconds - b.totalTimeSeconds,
        )
        .slice(0, MAX_PER_DIRECTION);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...otherDirection, ...sameDirection]),
      );
      return sameDirection;
    },
    [getAllEntries],
  );

  return { getEntries, addEntry };
};
