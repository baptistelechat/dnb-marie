import ReactCountryFlag from "react-country-flag";
import { Check } from "lucide-react";

interface CountryCardProps {
  code: string;
  name: string;
  capital: string;
  showCapitalFirst: boolean;
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

const CountryCard = ({
  code,
  name,
  capital,
  showCapitalFirst,
  checked,
  colorIndex,
  onToggle,
}: CountryCardProps) => {
  const colors = CANDY_COLORS[colorIndex];
  const primary = showCapitalFirst ? capital : name;
  const secondary = showCapitalFirst ? name : capital;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={`${name}, capitale ${capital} — ${checked ? "coché" : "non coché"}`}
      className="flex flex-col items-center gap-2.5 w-full px-3 py-4 rounded-3xl border-2 transition-all duration-200 cursor-pointer active:scale-95 text-center relative"
      style={{
        background: checked ? colors.checkedBg : colors.bg,
        borderColor: checked ? colors.checkedBorder : colors.border,
        boxShadow: checked
          ? `0 4px 14px ${colors.checkedBorder}50`
          : `0 2px 8px ${colors.border}40`,
      }}
    >
      <div className="relative">
        <ReactCountryFlag
          countryCode={code}
          svg
          alt=""
          aria-hidden="true"
          style={{
            width: "3rem",
            height: "2.25rem",
            borderRadius: "6px",
            objectFit: "cover",
            display: "block",
            boxShadow: "0 2px 6px rgba(0,0,0,0.14)",
            opacity: checked ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        />
        {checked && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-md"
            style={{ background: `${colors.checkedBorder}30` }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shadow-md"
              style={{ background: colors.checkBg }}
            >
              <Check size={14} strokeWidth={3.5} className="text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span
          className="text-xs font-bold leading-tight"
          style={{
            color: colors.text,
            opacity: checked ? 0.55 : 1,
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          {primary}
        </span>
        <span
          className="text-[10px] font-semibold leading-tight"
          style={{
            color: colors.text,
            opacity: checked ? 0.4 : 0.6,
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          {secondary}
        </span>
      </div>
    </button>
  );
};

export default CountryCard;
