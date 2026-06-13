import { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useHaptics } from "../../utils/hapticPatterns";
import { RotateCcw, Globe, Landmark, Trophy } from "lucide-react";
import { EU_COUNTRIES } from "../../data/euCountries";
import CountryCard from "./components/CountryCard";
import ProgressBar from "./components/ProgressBar";

const TOTAL = EU_COUNTRIES.length;

const EuropTab = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showCapitalFirst, setShowCapitalFirst] = useState(false);
  const { tick, success } = useHaptics();
  const completedRef = useRef(false);

  const count = checked.size;

  const handleToggle = useCallback(
    (code: string) => {
      tick();
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
    [tick],
  );

  const handleReset = useCallback(() => {
    setChecked(new Set());
    completedRef.current = false;
  }, []);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout> | undefined;
    if (count === TOTAL && !completedRef.current) {
      completedRef.current = true;
      success();
      const launch = () =>
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
          colors: [
            "#f9a8d4",
            "#c084fc",
            "#818cf8",
            "#67e8f9",
            "#86efac",
            "#fde68a",
          ],
        });
      launch();
      id = setTimeout(launch, 400);
    }
    if (count < TOTAL) {
      completedRef.current = false;
    }
    return () => clearTimeout(id);
  }, [count, success]);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Section header */}
      <div className="text-center pt-3 pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Globe size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Pays de l&apos;Union Européenne
          </h2>
          <Globe size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Coche tous les pays au fur et à mesure 🗺️
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex justify-center">
        <div
          className="flex rounded-full p-1 gap-1"
          style={{ background: "#f0e6ff" }}
          role="group"
          aria-label="Mode d'affichage"
        >
          <button
            type="button"
            onClick={() => setShowCapitalFirst(false)}
            className="flex items-center gap-1.5 text-sm font-bold rounded-full px-4 py-2 border-2 transition-all duration-200 active:scale-95"
            style={
              !showCapitalFirst
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
            aria-pressed={!showCapitalFirst}
          >
            <Globe size={14} />
            Pays
          </button>
          <button
            type="button"
            onClick={() => setShowCapitalFirst(true)}
            className="flex items-center gap-1.5 text-sm font-bold rounded-full px-4 py-2 border-2 transition-all duration-200 active:scale-95"
            style={
              showCapitalFirst
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
            aria-pressed={showCapitalFirst}
          >
            <Landmark size={14} />
            Capitales
          </button>
        </div>
      </div>

      {/* Progress card */}
      <div
        className="rounded-3xl p-4 border-2"
        style={{
          background: "white",
          borderColor: "#e9d5ff",
          boxShadow: "0 4px 20px #c084fc15",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy size={16} style={{ color: "#fbbf24" }} />
            <span className="text-sm font-bold text-slate-600">
              Progression
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                color: "#9575cd",
              }}
            >
              {count}
            </span>
            <span className="text-sm font-semibold text-slate-400">
              / {TOTAL}
            </span>
          </div>
        </div>

        <ProgressBar current={count} total={TOTAL} />

        {count === TOTAL && (
          <div
            className="mt-3 py-2.5 px-4 rounded-2xl text-center border-2"
            style={{ background: "#f0fdf4", borderColor: "#86efac" }}
          >
            <p
              className="text-green-700 font-bold text-sm"
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif" }}
            >
              🏆 Bravo ! Tu les as tous trouvés !
            </p>
          </div>
        )}
      </div>

      {/* Country grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
        {EU_COUNTRIES.map((country, index) => (
          <CountryCard
            key={country.code}
            code={country.code}
            name={country.name}
            capital={country.capital}
            showCapitalFirst={showCapitalFirst}
            checked={checked.has(country.code)}
            colorIndex={index % 6}
            onToggle={() => handleToggle(country.code)}
          />
        ))}
      </div>

      {/* Reset */}
      {count > 0 && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50 active:scale-95"
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
