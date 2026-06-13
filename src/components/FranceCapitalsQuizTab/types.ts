export type FranceCapitalsDirection = "region-to-capital" | "capital-to-region";
export type FranceCapitalsLastResult = "correct" | "wrong" | "skipped" | null;

export interface FranceCapitalsLeaderboardEntry {
  name: string;
  firstTryScore: number;
  hintScore?: number;
  totalRegions: number;
  totalTimeSeconds: number;
  date: string;
  direction: FranceCapitalsDirection;
}
