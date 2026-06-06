interface CapitalsProgressProps {
  answered: number;
  total: number;
}

const CapitalsProgress = ({ answered, total }: CapitalsProgressProps) => {
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <div
      className="rounded-3xl p-3 border-2 flex flex-col gap-2"
      style={{ borderColor: "#e9d5ff", background: "white" }}
    >
      <div className="flex justify-between items-center">
        <span
          className="text-sm font-bold"
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif",
            color: "#6a1b9a",
          }}
        >
          Progression
        </span>
        <span
          className="text-sm font-bold"
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif",
            color: "#9575cd",
          }}
        >
          {answered} / {total} pays
        </span>
      </div>

      <div
        className="h-3 rounded-full w-full overflow-hidden border"
        style={{ background: "white", borderColor: "#e9d5ff" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #f9a8d4, #c084fc, #818cf8)",
          }}
        />
      </div>

      {answered > 0 && (
        <p
          className="text-xs text-right"
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            color: "#b0bec5",
          }}
        >
          {pct}% réussis
        </p>
      )}
    </div>
  );
};

export default CapitalsProgress;
