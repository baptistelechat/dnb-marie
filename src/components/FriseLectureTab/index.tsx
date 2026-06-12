import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import confetti from "canvas-confetti";
import { AlignCenter, RotateCcw, Trophy } from "lucide-react";
import { HISTORICAL_DATES } from "../../data/historicalDates";
import { computeLanes } from "./utils/computeLanes";
import TimelineCanvas from "./components/TimelineCanvas";
import ProgressBar from "../shared/ProgressBar";
import { useHaptics } from "../../utils/hapticPatterns";

const TOTAL = HISTORICAL_DATES.length;

const CANDY_COLORS = [
  "#f9a8d4",
  "#c084fc",
  "#818cf8",
  "#67e8f9",
  "#86efac",
  "#fde68a",
];

const FriseLectureTab = () => {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const { tick, success } = useHaptics();
  const completedRef = useRef(false);

  const count = seen.size;

  const points = useMemo(
    () => HISTORICAL_DATES.filter((d) => d.type === "point"),
    [],
  );

  const rangesWithLanes = useMemo(() => computeLanes(HISTORICAL_DATES), []);

  const colorMap = useMemo(() => {
    const map = new Map<string, string>();
    let i = 0;
    for (const d of HISTORICAL_DATES) {
      if (d.type === "range") {
        map.set(d.id, CANDY_COLORS[i % CANDY_COLORS.length]);
        i++;
      }
    }
    return map;
  }, []);

  const handleToggle = useCallback(
    (id: string) => {
      tick();
      setSeen((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [tick],
  );

  const handleReset = useCallback(() => {
    setSeen(new Set());
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
    if (count < TOTAL) completedRef.current = false;
    return () => clearTimeout(id);
  }, [count, success]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-center pt-3 pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <AlignCenter size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Frise chronologique
          </h2>
          <AlignCenter size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Tape sur chaque événement pour le valider 📅
        </p>
      </div>

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
              🏆 Bravo ! Tu as revu toute la frise !
            </p>
          </div>
        )}
      </div>

      <div
        className="rounded-3xl border-2 p-3"
        style={{
          background: "white",
          borderColor: "#e9d5ff",
          boxShadow: "0 4px 20px #c084fc15",
        }}
      >
        <TimelineCanvas
          points={points}
          rangesWithLanes={rangesWithLanes}
          seen={seen}
          colorMap={colorMap}
          onToggle={handleToggle}
        />
      </div>

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

export default FriseLectureTab;
