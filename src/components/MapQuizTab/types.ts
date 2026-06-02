export type QuizMode = "free" | "directed";
export type LastResult = "correct" | "wrong" | null;

export interface GeoFeature {
  type: string;
  id: string;
  properties: Record<string, unknown>;
  geometry: unknown;
}
