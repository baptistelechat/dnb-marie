import { useCallback } from "react";
import type { PhotoLeaderboardEntry } from "../types";

const STORAGE_KEY = "dnb-histoire-photos-flashcard-leaderboard";
const MAX_ENTRIES = 10;

export const usePhotoLeaderboard = () => {
  const getAllEntries = useCallback((): PhotoLeaderboardEntry[] => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
      ) as PhotoLeaderboardEntry[];
    } catch {
      return [];
    }
  }, []);

  const sortEntries = useCallback(
    (entries: PhotoLeaderboardEntry[]): PhotoLeaderboardEntry[] =>
      [...entries].sort((a, b) => {
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
    (): PhotoLeaderboardEntry[] => sortEntries(getAllEntries()),
    [getAllEntries, sortEntries],
  );

  const addEntry = useCallback(
    (entry: PhotoLeaderboardEntry): PhotoLeaderboardEntry[] => {
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
