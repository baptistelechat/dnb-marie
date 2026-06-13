export type ColumnItemState = "idle" | "selected" | "fading" | "shaking";

interface ColumnItemProps {
  label: string;
  itemState: ColumnItemState;
  onClick: () => void;
  className?: string;
}

const ColumnItem = ({
  label,
  itemState,
  onClick,
  className = "",
}: ColumnItemProps) => {
  const isSelected = itemState === "selected";
  const isFading = itemState === "fading";
  const isShaking = itemState === "shaking";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isFading}
      aria-pressed={isSelected}
      className={`w-full rounded-full px-3 py-2.5 text-sm font-semibold border-2 active:scale-95 ${className}`}
      style={{
        fontFamily: "'Nunito', system-ui, sans-serif",
        background: isSelected
          ? "linear-gradient(135deg, #ede7f6, #e3f2fd)"
          : isShaking
            ? "#ffebee"
            : "white",
        borderColor: isSelected ? "#9575cd" : isShaking ? "#ef9a9a" : "#e9d5ff",
        color: isSelected ? "#6a1b9a" : isShaking ? "#c62828" : "#7e57c2",
        boxShadow: isSelected ? "0 2px 8px #9575cd30" : "0 1px 4px #c084fc10",
        opacity: isFading ? 0 : 1,
        transform: isFading ? "scale(0.9)" : undefined,
        transition: isFading
          ? "opacity 0.3s ease, transform 0.3s ease"
          : "background 0.15s ease, border-color 0.15s ease",
        animation: isShaking ? "shake 0.5s ease-in-out" : undefined,
        pointerEvents: isFading ? "none" : undefined,
      }}
    >
      {label}
    </button>
  );
};

export default ColumnItem;
