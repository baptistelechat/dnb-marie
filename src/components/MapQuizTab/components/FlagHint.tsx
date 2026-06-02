import CountryFlag from "react-country-flag";
import { Eye, EyeOff } from "lucide-react";

interface FlagHintProps {
  countryCode: string;
  visible: boolean;
  onToggle: () => void;
}

const FlagHint = ({ countryCode, visible, onToggle }: FlagHintProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-95"
        style={{
          background: visible ? "#e8f5e9" : "#fff3e0",
          color: visible ? "#2e7d32" : "#e65100",
          border: `2px solid ${visible ? "#a5d6a7" : "#ffcc80"}`,
        }}
        aria-pressed={visible}
        aria-label={
          visible ? "Masquer le drapeau" : "Voir le drapeau en indice"
        }
      >
        {visible ? <EyeOff size={12} /> : <Eye size={12} />}
        {visible ? "Masquer l'indice" : "Indice : voir le drapeau"}
      </button>

      {visible && (
        <div
          className="rounded-xl overflow-hidden shadow-md"
          style={{ border: "3px solid #a5d6a7" }}
          aria-label={`Drapeau indice`}
        >
          <CountryFlag
            countryCode={countryCode}
            svg
            style={{ width: "64px", height: "48px", display: "block" }}
          />
        </div>
      )}
    </div>
  );
};

export default FlagHint;
