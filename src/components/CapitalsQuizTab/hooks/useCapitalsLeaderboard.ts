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

  const sortEntries = useCallback(
    (entries: CapitalsLeaderboardEntry[]): CapitalsLeaderboardEntry[] =>
      entries.toSorted((a, b) => {
        const wa = a.firstTryScore * 2 + (a.hintScore ?? 0);
        const wb = b.firstTryScore * 2 + (b.hintScore ?? 0);
        return (
          wb - wa ||
          b.firstTryScore - a.firstTryScore ||
          a.totalTimeSeconds - b.totalTimeSeconds
        );
      }),
    [],
  );

  const getEntries = useCallback(
    (direction: CapitalsDirection): CapitalsLeaderboardEntry[] =>
      sortEntries(getAllEntries().filter((e) => e.direction === direction)),
    [getAllEntries, sortEntries],
  );

  const addEntry = useCallback(
    (entry: CapitalsLeaderboardEntry): CapitalsLeaderboardEntry[] => {
      const all = getAllEntries();
      const otherDirection = all.filter((e) => e.direction !== entry.direction);
      const sameDirection = sortEntries([
        ...all.filter((e) => e.direction === entry.direction),
        entry,
      ]).slice(0, MAX_PER_DIRECTION);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...otherDirection, ...sameDirection]),
      );
      return sameDirection;
    },
    [getAllEntries, sortEntries],
  );

  return { getEntries, addEntry };
};
