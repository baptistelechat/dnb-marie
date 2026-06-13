export type QuizMode = "free" | "directed";
export type LastResult = "correct" | "wrong" | "skipped" | null;

export interface GeoFeature {
  type: string;
  id: string;
  properties: Record<string, unknown>;
  geometry: unknown;
}

export interface LeaderboardEntry {
  name: string;
  firstTryScore: number;
  hintScore?: number;
  totalCountries: number;
  totalTimeSeconds: number;
  date: string;
}
