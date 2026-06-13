export type CapitalsQuizMode = "free" | "directed";
export type CapitalsDirection = "country-to-capital" | "capital-to-country";
export type CapitalsLastResult = "correct" | "wrong" | "skipped" | null;

export interface CapitalsLeaderboardEntry {
  name: string;
  firstTryScore: number;
  hintScore?: number;
  totalCountries: number;
  totalTimeSeconds: number;
  date: string;
  direction: CapitalsDirection;
}
