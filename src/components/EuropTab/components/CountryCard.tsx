import ReactCountryFlag from "react-country-flag";
import { Check } from "lucide-react";

interface CountryCardProps {
  code: string;
  name: string;
  checked: boolean;
  onToggle: () => void;
}

const CountryCard = ({ code, name, checked, onToggle }: CountryCardProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={`${name} — ${checked ? "coché" : "non coché"}`}
      className={[
        "flex items-center gap-3 w-full px-3 py-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left min-h-[56px] active:scale-95",
        checked
          ? "bg-emerald-50 border-emerald-300 shadow-sm"
          : "bg-white border-violet-100 shadow-sm hover:border-violet-300 hover:shadow-md",
      ].join(" ")}
    >
      <ReactCountryFlag
        countryCode={code}
        svg
        alt=""
        aria-hidden="true"
        style={{
          width: "2.25rem",
          height: "1.6875rem",
          borderRadius: "4px",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      <span
        className={[
          "flex-1 font-medium text-sm leading-tight",
          checked ? "line-through text-emerald-700" : "text-slate-700",
        ].join(" ")}
      >
        {name}
      </span>

      <div
        className={[
          "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
          checked
            ? "bg-emerald-500 border-emerald-500"
            : "border-slate-300 bg-white",
        ].join(" ")}
      >
        {checked && <Check size={13} strokeWidth={3} className="text-white" />}
      </div>
    </button>
  );
};

export default CountryCard;
