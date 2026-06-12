export type PhotoLastResult = "correct" | "wrong" | "skipped" | null;

export interface PhotoLeaderboardEntry {
  name: string;
  firstTryScore: number;
  hintScore?: number;
  totalItems: number;
  totalTimeSeconds: number;
  date: string;
}

export interface PhotoEntry {
  entryId: string; // `${figureId}-${photoIndex}`
  photoUrl: string;
  figureName: string;
  figurePeriod: string;
  figureId: string;
}
