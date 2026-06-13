import { HISTORICAL_DATES } from "../../../data/historicalDates";
import DateCard from "./DateCard";

interface DateListViewProps {
  seen: Set<string>;
  onToggle: (id: string) => void;
}

const SORTED_DATES = HISTORICAL_DATES.toSorted((a, b) => a.sortKey - b.sortKey);

const DateListView = ({ seen, onToggle }: DateListViewProps) => (
  <div className="flex flex-col gap-2.5">
    {SORTED_DATES.map((item, index) => (
      <DateCard
        key={item.id}
        item={item}
        checked={seen.has(item.id)}
        colorIndex={index % 6}
        onToggle={() => onToggle(item.id)}
      />
    ))}
  </div>
);

export default DateListView;
