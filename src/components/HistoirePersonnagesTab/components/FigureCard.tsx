import { Check, User } from "lucide-react";

interface FigureCardProps {
  name: string;
  period: string;
  role: string;
  checked: boolean;
  colorIndex: number;
  onToggle: () => void;
}

const CANDY_COLORS = [
  {
    bg: "#fce4ec",
    border: "#f48fb1",
    checkedBg: "#f8bbd0",
    checkedBorder: "#e91e63",
    text: "#880e4f",
    checkBg: "#c2185b",
  },
  {
    bg: "#ede7f6",
    border: "#b39ddb",
    checkedBg: "#d1c4e9",
    checkedBorder: "#7e57c2",
    text: "#4a148c",
    checkBg: "#6a1b9a",
  },
  {
    bg: "#e3f2fd",
    border: "#90caf9",
    checkedBg: "#bbdefb",
    checkedBorder: "#42a5f5",
    text: "#0d47a1",
    checkBg: "#1565c0",
  },
  {
    bg: "#e8f5e9",
    border: "#a5d6a7",
    checkedBg: "#c8e6c9",
    checkedBorder: "#43a047",
    text: "#1b5e20",
    checkBg: "#2e7d32",
  },
  {
    bg: "#fff3e0",
    border: "#ffcc80",
    checkedBg: "#ffe0b2",
    checkedBorder: "#ff9800",
    text: "#e65100",
    checkBg: "#f57c00",
  },
  {
    bg: "#fffde7",
    border: "#fff176",
    checkedBg: "#fff9c4",
    checkedBorder: "#f9a825",
    text: "#f57f17",
    checkBg: "#f9a825",
  },
] as const;

const FigureCard = ({
  name,
  period,
  role,
  checked,
  colorIndex,
  onToggle,
}: FigureCardProps) => {
  const colors = CANDY_COLORS[colorIndex % 6];

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={`${name} — ${checked ? "coché" : "non coché"}`}
      className="flex items-start gap-3 w-full px-4 py-3.5 rounded-3xl border-2 transition-all duration-200 cursor-pointer active:scale-95 text-left"
      style={{
        background: checked ? colors.checkedBg : colors.bg,
        borderColor: checked ? colors.checkedBorder : colors.border,
        boxShadow: checked
          ? `0 4px 14px ${colors.checkedBorder}50`
          : `0 2px 8px ${colors.border}40`,
      }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0 mt-0.5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: colors.checkBg,
            opacity: checked ? 0.5 : 0.85,
          }}
        >
          <User size={18} className="text-white" />
        </div>
        {checked && (
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
            style={{ background: colors.checkBg }}
          >
            <Check size={11} strokeWidth={3.5} className="text-white" />
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span
          className="font-bold leading-tight"
          style={{
            color: colors.text,
            opacity: checked ? 0.6 : 1,
            fontFamily: "'Fredoka', system-ui, sans-serif",
            fontSize: "1rem",
          }}
        >
          {name}
        </span>
        <span
          className="text-[10px] font-semibold uppercase tracking-wide"
          style={{
            color: colors.text,
            opacity: checked ? 0.35 : 0.55,
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          {period}
        </span>
        <span
          className="text-xs font-semibold leading-tight mt-0.5 line-clamp-2"
          style={{
            color: colors.text,
            opacity: checked ? 0.4 : 0.75,
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          {role}
        </span>
      </div>
    </button>
  );
};

export default FigureCard;
