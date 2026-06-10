import { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useHaptics } from "../../utils/hapticPatterns";
import { RotateCcw, Users, Trophy } from "lucide-react";
import { HISTORICAL_FIGURES } from "../../data/historicalFigures";
import FigureCard from "./components/FigureCard";
import ProgressBar from "./components/ProgressBar";

const TOTAL = HISTORICAL_FIGURES.length;

const HistoirePersonnagesTab = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const { tick, success } = useHaptics();
  const completedRef = useRef(false);

  const count = checked.size;

  const handleToggle = useCallback(
    (id: string) => {
      tick();
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
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
      setTimeout(launch, 400);
    }
    if (count < TOTAL) {
      completedRef.current = false;
    }
  }, [count, success]);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Section header */}
      <div className="text-center pt-3 pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Users size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Personnages historiques
          </h2>
          <Users size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Coche chaque personnage au fur et à mesure 🏛️
        </p>
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
              🏆 Bravo ! Tu les connais tous !
            </p>
          </div>
        )}
      </div>

      {/* Liste des personnages */}
      <div className="flex flex-col gap-2.5">
        {HISTORICAL_FIGURES.map((figure, index) => (
          <FigureCard
            key={figure.id}
            name={figure.name}
            period={figure.period}
            role={figure.role}
            checked={checked.has(figure.id)}
            colorIndex={index % 6}
            onToggle={() => handleToggle(figure.id)}
          />
        ))}
      </div>

      {/* Recommencer */}
      {count > 0 && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50 active:scale-95"
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

export default HistoirePersonnagesTab;
