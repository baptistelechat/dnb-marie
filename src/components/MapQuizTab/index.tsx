import { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useWebHaptics } from "web-haptics/react";
import { Map as MapIcon } from "lucide-react";
import { EU_COUNTRIES, type Country } from "../../data/euCountries";
import { answersMatch } from "../../utils/normalizeAnswer";
import type { QuizMode, LastResult } from "./types";
import ModeToggle from "./components/ModeToggle";
import EuropeMap from "./components/EuropeMap";
import QuizPanel from "./components/QuizPanel";
import QuizProgress from "./components/QuizProgress";

const TOTAL = EU_COUNTRIES.length;
const COUNTRY_MAP = new Map<string, Country>(
  EU_COUNTRIES.map((c) => [c.code, c]),
);

const shuffle = (codes: string[]): string[] => {
  const arr = [...codes];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j]!;
    arr[j] = tmp!;
  }
  return arr;
};

const MapQuizTab = () => {
  const { trigger } = useWebHaptics();
  const completedRef = useRef(false);

  const [mode, setMode] = useState<QuizMode>("free");
  const [freeActiveCode, setFreeActiveCode] = useState<string | null>(null);
  const [answeredCodes, setAnsweredCodes] = useState<Set<string>>(new Set());
  const [lastResult, setLastResult] = useState<LastResult>(null);
  const [showFlag, setShowFlag] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);

  const activeCode = mode === "directed" ? (queue[0] ?? null) : freeActiveCode;
  const activeCountry = activeCode
    ? (COUNTRY_MAP.get(activeCode) ?? null)
    : null;
  const pulsingCode = mode === "directed" ? (queue[0] ?? null) : null;

  const launchConfetti = useCallback(() => {
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
  }, []);

  useEffect(() => {
    if (answeredCodes.size === TOTAL && !completedRef.current) {
      completedRef.current = true;
      trigger("success");
      launchConfetti();
    }
    if (answeredCodes.size < TOTAL) {
      completedRef.current = false;
    }
  }, [answeredCodes.size, trigger, launchConfetti]);

  const resetState = useCallback(() => {
    setFreeActiveCode(null);
    setAnsweredCodes(new Set());
    setLastResult(null);
    setShowFlag(false);
    completedRef.current = false;
  }, []);

  const handleModeChange = useCallback(
    (newMode: QuizMode) => {
      setMode(newMode);
      resetState();
      if (newMode === "directed") {
        setQueue(shuffle(EU_COUNTRIES.map((c) => c.code)));
      } else {
        setQueue([]);
      }
    },
    [resetState],
  );

  const handleSelect = useCallback(
    (alpha2: string) => {
      if (mode === "free") {
        setFreeActiveCode(alpha2);
        setLastResult(null);
        setShowFlag(false);
      }
    },
    [mode],
  );

  const handleSubmit = useCallback(
    (nameInput: string, capitalInput: string) => {
      if (!activeCountry) return;
      const correct =
        answersMatch(nameInput, activeCountry.name) &&
        answersMatch(capitalInput, activeCountry.capital);
      trigger(40);
      if (correct) {
        setAnsweredCodes((prev) => {
          const next = new Set(prev);
          next.add(activeCountry.code);
          return next;
        });
      }
      setLastResult(correct ? "correct" : "wrong");
    },
    [activeCountry, trigger],
  );

  const handleNext = useCallback(() => {
    if (mode === "directed") {
      setQueue((prev) => prev.slice(1));
      setLastResult(null);
      setShowFlag(false);
    } else {
      setFreeActiveCode(null);
      setLastResult(null);
      setShowFlag(false);
    }
  }, [mode]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-center pt-3 pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <MapIcon size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Carte de l&apos;Europe
          </h2>
          <MapIcon size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Identifie les pays et leurs capitales 🏛️
        </p>
      </div>

      <div className="flex justify-center">
        <ModeToggle mode={mode} onChange={handleModeChange} />
      </div>

      {mode === "directed" && (
        <QuizProgress answered={answeredCodes.size} total={TOTAL} />
      )}

      {answeredCodes.size === TOTAL && (
        <div
          className="rounded-3xl py-3 px-4 text-center border-2"
          style={{ background: "#f0fdf4", borderColor: "#86efac" }}
        >
          <p
            className="text-green-700 font-bold"
            style={{ fontFamily: "'Fredoka', system-ui, sans-serif" }}
          >
            🏆 Bravo ! Tu as identifié les 27 pays !
          </p>
        </div>
      )}

      <EuropeMap
        activeCode={activeCode}
        answeredCodes={answeredCodes}
        pulsingCode={pulsingCode}
        onSelect={handleSelect}
      />

      <QuizPanel
        key={activeCode ?? "empty"}
        country={activeCountry}
        mode={mode}
        lastResult={lastResult}
        showFlag={showFlag}
        onToggleFlag={() => setShowFlag((v) => !v)}
        onSubmit={handleSubmit}
        onNext={handleNext}
      />
    </div>
  );
};

export default MapQuizTab;
