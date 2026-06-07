import { useState } from "react";
import { Check, MapPin } from "lucide-react";
import type { Region } from "../../../data/frenchRegions";
import { REGION_LOGOS } from "../../../data/frenchRegions";

interface RegionCardProps {
  region: Region;
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
    icon: "#e91e63",
  },
  {
    bg: "#ede7f6",
    border: "#b39ddb",
    checkedBg: "#d1c4e9",
    checkedBorder: "#7e57c2",
    text: "#4a148c",
    checkBg: "#6a1b9a",
    icon: "#9575cd",
  },
  {
    bg: "#e3f2fd",
    border: "#90caf9",
    checkedBg: "#bbdefb",
    checkedBorder: "#42a5f5",
    text: "#0d47a1",
    checkBg: "#1565c0",
    icon: "#42a5f5",
  },
  {
    bg: "#e8f5e9",
    border: "#a5d6a7",
    checkedBg: "#c8e6c9",
    checkedBorder: "#43a047",
    text: "#1b5e20",
    checkBg: "#2e7d32",
    icon: "#43a047",
  },
  {
    bg: "#fff3e0",
    border: "#ffcc80",
    checkedBg: "#ffe0b2",
    checkedBorder: "#ff9800",
    text: "#e65100",
    checkBg: "#f57c00",
    icon: "#ff9800",
  },
  {
    bg: "#fffde7",
    border: "#fff176",
    checkedBg: "#fff9c4",
    checkedBorder: "#f9a825",
    text: "#f57f17",
    checkBg: "#f9a825",
    icon: "#f9a825",
  },
] as const;

const RegionCard = ({
  region,
  showCapitalFirst,
  checked,
  colorIndex,
  onToggle,
}: RegionCardProps) => {
  const colors = CANDY_COLORS[colorIndex % CANDY_COLORS.length];
  const [imgFailed, setImgFailed] = useState(false);
  const logoUrl = REGION_LOGOS[region.code];
  const primary = showCapitalFirst ? region.capital : region.name;
  const secondary = showCapitalFirst ? region.name : region.capital;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={`${region.name}, chef-lieu ${region.capital} — ${checked ? "coché" : "non coché"}`}
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
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden"
          style={{
            background: checked
              ? `${colors.checkedBorder}20`
              : `${colors.border}30`,
            opacity: checked ? 0.7 : 1,
          }}
        >
          {logoUrl && !imgFailed ? (
            <img
              src={logoUrl}
              alt={`Logo ${region.name}`}
              width={44}
              height={44}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <MapPin
              size={20}
              aria-hidden="true"
              style={{ color: checked ? colors.checkedBorder : colors.icon }}
            />
          )}
        </div>
        {checked && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg"
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

      {region.isDom && (
        <span
          className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
          style={{
            background: colors.border,
            color: colors.text,
          }}
        >
          DOM
        </span>
      )}

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

export default RegionCard;
