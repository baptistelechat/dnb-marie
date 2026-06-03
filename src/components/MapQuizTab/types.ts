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
  firstTryScore: number; // pays réussis du premier coup
  totalCountries: number; // toujours 27
  totalTimeSeconds: number; // durée en secondes
  date: string; // ISO 8601
}
