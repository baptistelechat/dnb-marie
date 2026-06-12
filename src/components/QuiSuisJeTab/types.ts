export type QSJLastResult = "correct" | "wrong" | "skipped" | null;

export interface QSJLeaderboardEntry {
  name: string;
  firstTryScore: number;
  hintScore: number;
  totalItems: number;
  totalTimeSeconds: number;
  date: string;
}
