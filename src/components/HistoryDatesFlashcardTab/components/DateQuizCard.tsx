import { Calendar, FileText } from "lucide-react";
import type { HistoricalDate } from "../../../data/historicalDates";
import type { HistoryDatesFlashcardDirection } from "../types";

interface DateQuizCardProps {
  item: HistoricalDate | null;
  direction: HistoryDatesFlashcardDirection;
}

const DateQuizCard = ({ item, direction }: DateQuizCardProps) => {
  if (!item) return null;

  const isDateToEvent = direction === "date-to-event";
  const content = isDateToEvent ? item.date : item.event;
  const Icon = isDateToEvent ? Calendar : FileText;

  return (
    <div
      className="rounded-3xl p-6 flex flex-col items-center gap-3 text-center"
      style={{
        background: "rgba(255,255,255,0.9)",
        border: "2px solid #e0d4f5",
        boxShadow: "0 4px 20px rgba(126,87,194,0.1)",
      }}
    >
      <Icon size={24} style={{ color: "#9575cd" }} aria-hidden="true" />
      <p
        className="text-xl font-bold"
        style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          color: "#4a148c",
          lineHeight: 1.3,
        }}
      >
        {content}
      </p>
      {item.period && (
        <span
          className="text-xs px-3 py-1 rounded-full font-semibold"
          style={{
            background: "#f5f0fb",
            color: "#9575cd",
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          {item.period}
        </span>
      )}
      <p
        className="text-xs"
        style={{
          color: "#b0bec5",
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
      >
        {isDateToEvent ? "Quel est l'événement ?" : "Quelle est la date ?"}
      </p>
    </div>
  );
};

export default DateQuizCard;
