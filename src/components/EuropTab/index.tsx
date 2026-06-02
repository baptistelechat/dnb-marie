import { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useWebHaptics } from "web-haptics/react";
import { RotateCcw } from "lucide-react";
import { EU_COUNTRIES } from "../../data/euCountries";
import CountryCard from "./components/CountryCard";
import ProgressBar from "./components/ProgressBar";

const TOTAL = EU_COUNTRIES.length;

const EuropTab = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const { trigger } = useWebHaptics();
  const completedRef = useRef(false);

  const count = checked.size;

  const handleToggle = useCallback(
    (code: string) => {
      trigger(40);
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(code)) {
          next.delete(code);
        } else {
          next.add(code);
        }
        return next;
      });
    },
    [trigger],
  );

  const handleReset = useCallback(() => {
    setChecked(new Set());
    completedRef.current = false;
  }, []);

  useEffect(() => {
    if (count === TOTAL && !completedRef.current) {
      completedRef.current = true;
      trigger("success");
      const launch = () =>
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
          colors: [
            "#e9d5ff",
            "#fce7f3",
            "#dbeafe",
            "#d1fae5",
            "#fef3c7",
            "#fed7aa",
          ],
        });
      launch();
      setTimeout(launch, 400);
    }
    if (count < TOTAL) {
      completedRef.current = false;
    }
  }, [count, trigger]);

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="text-center pt-2">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
          🌍 Pays de l&apos;UE
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Coche les pays au fur et à mesure !
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-sm border border-violet-100">
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-sm font-semibold text-slate-600">
            {count} / {TOTAL} pays
          </span>
          <span className="text-sm font-bold text-violet-600">
            {Math.round((count / TOTAL) * 100)}%
          </span>
        </div>
        <ProgressBar current={count} total={TOTAL} />
        {count === TOTAL && (
          <div className="mt-3 py-2 px-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
            <p className="text-emerald-700 font-bold text-sm">
              🎉 Bravo ! Tu les as tous trouvés !
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {EU_COUNTRIES.map((country) => (
          <CountryCard
            key={country.code}
            code={country.code}
            name={country.name}
            checked={checked.has(country.code)}
            onToggle={() => handleToggle(country.code)}
          />
        ))}
      </div>

      {count > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50"
            aria-label="Recommencer depuis le début"
          >
            <RotateCcw size={14} />
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
};

export default EuropTab;
