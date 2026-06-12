import { useCallback } from "react";
import type { QSJLeaderboardEntry } from "../types";

const STORAGE_KEY = "dnb-histoire-qui-suis-je-leaderboard";
const MAX_ENTRIES = 10;

export const useQSJLeaderboard = () => {
  const getAllEntries = useCallback((): QSJLeaderboardEntry[] => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
      ) as QSJLeaderboardEntry[];
    } catch {
      return [];
    }
  }, []);

  const sortEntries = useCallback(
    (entries: QSJLeaderboardEntry[]): QSJLeaderboardEntry[] =>
      [...entries].sort((a, b) => {
        const wa = a.firstTryScore * 2 + a.hintScore;
        const wb = b.firstTryScore * 2 + b.hintScore;
        return (
          wb - wa ||
          b.firstTryScore - a.firstTryScore ||
          a.totalTimeSeconds - b.totalTimeSeconds
        );
      }),
    [],
  );

  const getEntries = useCallback(
    (): QSJLeaderboardEntry[] => sortEntries(getAllEntries()),
    [getAllEntries, sortEntries],
  );

  const addEntry = useCallback(
    (entry: QSJLeaderboardEntry): QSJLeaderboardEntry[] => {
      const sorted = sortEntries([...getAllEntries(), entry]).slice(
        0,
        MAX_ENTRIES,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
      return sorted;
    },
    [getAllEntries, sortEntries],
  );

  return { getEntries, addEntry };
};
