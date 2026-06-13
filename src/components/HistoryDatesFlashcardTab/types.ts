export type HistoryDatesFlashcardDirection = "date-to-event" | "event-to-date";
export type HistoryDatesLastResult = "correct" | "wrong" | "skipped" | null;

export interface HistoryDatesLeaderboardEntry {
  name: string;
  firstTryScore: number;
  hintScore?: number;
  totalItems: number;
  totalTimeSeconds: number;
  date: string;
  direction: HistoryDatesFlashcardDirection;
}
