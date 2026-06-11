export type ItemState = "idle" | "correct";

export interface GameItem {
  id: string;
  event: string;
  date: string;
  type: "point" | "range";
  sortKey: number;
  endSortKey?: number;
  state: ItemState;
  firstTryFailed: boolean;
}

export interface OrdonnerLeaderboardEntry {
  name: string;
  freeScore: number;
  totalItems: number;
  totalTimeSeconds: number;
  date: string;
}
