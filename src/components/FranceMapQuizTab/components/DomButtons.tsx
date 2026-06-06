import { MapPin } from "lucide-react";
import type { Region } from "../../../data/frenchRegions";

interface DomButtonsProps {
  regions: Region[];
  activeCode: string | null;
  answeredCodes: Set<string>;
  pulsingCode: string | null;
  isInteractive: boolean;
  onSelect: (code: string) => void;
}

const DomButtons = ({
  regions,
  activeCode,
  answeredCodes,
  pulsingCode,
  isInteractive,
  onSelect,
}: DomButtonsProps) => {
  if (regions.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <p
        className="text-xs font-semibold text-center"
        style={{
          color: "#9575cd",
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
      >
        Départements et Régions d&apos;Outre-Mer
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {regions.map((region) => {
          const isActive = region.code === activeCode;
          const isAnswered = answeredCodes.has(region.code);
          const isPulsing = region.code === pulsingCode;

          let bg = "#e5e7eb";
          let border = "#d1d5db";
          let color = "#6b7280";

          if (isAnswered) {
            bg = "#ddd6fe";
            border = "#7e57c2";
            color = "#4a148c";
          } else if (isActive || isPulsing) {
            bg = "#ede9fe";
            border = "#9575cd";
            color = "#6a1b9a";
          }

          return (
            <button
              key={region.code}
              type="button"
              disabled={!isInteractive}
              onClick={() => isInteractive && onSelect(region.code)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all duration-200 active:scale-95 disabled:cursor-default"
              style={{
                background: bg,
                borderColor: border,
                color,
                fontFamily: "'Nunito', system-ui, sans-serif",
                animation: isPulsing
                  ? "map-pulse 1.2s ease-in-out infinite"
                  : "none",
              }}
              aria-label={`${region.name}${isAnswered ? " — trouvé" : ""}`}
              aria-pressed={isAnswered}
            >
              <MapPin size={11} aria-hidden="true" />
              {region.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DomButtons;
