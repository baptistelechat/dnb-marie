import { MapPin, Landmark } from "lucide-react";
import type { FranceCapitalsDirection } from "../types";

interface FranceDirectionToggleProps {
  direction: FranceCapitalsDirection;
  onChange: (direction: FranceCapitalsDirection) => void;
}

const DIRECTIONS: {
  value: FranceCapitalsDirection;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "region-to-capital",
    label: "Région → Chef-lieu",
    icon: <MapPin size={14} />,
  },
  {
    value: "capital-to-region",
    label: "Chef-lieu → Région",
    icon: <Landmark size={14} />,
  },
];

const FranceDirectionToggle = ({
  direction,
  onChange,
}: FranceDirectionToggleProps) => {
  return (
    <div
      className="flex rounded-full p-1 gap-1"
      style={{ background: "#f0e6ff" }}
      role="group"
      aria-label="Direction du quiz"
    >
      {DIRECTIONS.map(({ value, label, icon }) => {
        const isActive = direction === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className="flex items-center gap-1.5 text-sm font-bold rounded-full px-4 py-2 border-2 transition-all duration-200 active:scale-95"
            style={
              isActive
                ? {
                    background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
                    borderColor: "#9575cd",
                    color: "#6a1b9a",
                    boxShadow: "0 2px 8px #9575cd30",
                    fontFamily: "'Fredoka', system-ui, sans-serif",
                  }
                : {
                    background: "transparent",
                    borderColor: "#e0d4f5",
                    color: "#9575cd",
                    fontFamily: "'Fredoka', system-ui, sans-serif",
                  }
            }
            aria-pressed={isActive}
          >
            {icon}
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default FranceDirectionToggle;
