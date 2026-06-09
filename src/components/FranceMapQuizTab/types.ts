export type QuizMode = "free" | "directed";
export type LastResult = "correct" | "wrong" | "skipped" | null;

export interface FranceLeaderboardEntry {
  name: string;
  firstTryScore: number;
  hintScore?: number;
  totalRegions: number;
  totalTimeSeconds: number;
  date: string;
}
