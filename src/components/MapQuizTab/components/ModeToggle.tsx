import { Map, Shuffle } from "lucide-react";
import type { QuizMode } from "../types";

interface ModeToggleProps {
  mode: QuizMode;
  onChange: (mode: QuizMode) => void;
}

const MODES: { value: QuizMode; label: string; icon: React.ReactNode }[] = [
  { value: "free", label: "Libre", icon: <Map size={14} /> },
  { value: "directed", label: "Dirigé", icon: <Shuffle size={14} /> },
];

const ModeToggle = ({ mode, onChange }: ModeToggleProps) => {
  return (
    <div
      className="flex rounded-full p-1 gap-1"
      style={{ background: "#f0e6ff" }}
      role="group"
      aria-label="Mode de jeu"
    >
      {MODES.map(({ value, label, icon }) => {
        const isActive = mode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-95"
            style={
              isActive
                ? {
                    background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
                    color: "#6a1b9a",
                    boxShadow: "0 2px 8px #9575cd30",
                    border: "2px solid #9575cd",
                  }
                : {
                    background: "transparent",
                    color: "#9575cd",
                    border: "2px solid transparent",
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

export default ModeToggle;
