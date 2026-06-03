interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const pct = total > 0 ? (current / total) * 100 : 0;
  const showLabel = pct > 10;

  return (
    <div
      className="w-full rounded-full h-6 overflow-hidden relative"
      style={{ background: "#f3e8ff" }}
    >
      <div
        className="h-full rounded-full transition-all duration-700 ease-out absolute top-0 left-0"
        style={{
          width: `${pct}%`,
          background:
            "linear-gradient(90deg, #f9a8d4 0%, #c084fc 50%, #818cf8 100%)",
          boxShadow: pct > 5 ? "0 0 16px #c084fc70" : "none",
        }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${current} pays sur ${total} identifiés`}
      />
      {showLabel && (
        <span
          className="absolute inset-0 flex items-center justify-center font-bold"
          style={{
            fontSize: "11px",
            color: pct > 45 ? "white" : "#9575cd",
            fontFamily: "'Fredoka', system-ui, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
