import { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useHaptics } from "../../utils/hapticPatterns";
import { Map as MapIcon, RotateCcw } from "lucide-react";
import { EU_COUNTRIES, type Country } from "../../data/euCountries";
import { answersMatch } from "../../utils/normalizeAnswer";
import type { QuizMode, LastResult, LeaderboardEntry } from "./types";
import { useLeaderboard } from "./hooks/useLeaderboard";
import ModeToggle from "./components/ModeToggle";
import EuropeMap from "./components/EuropeMap";
import QuizPanel from "./components/QuizPanel";
import QuizProgress from "./components/QuizProgress";
import Timer from "./components/Timer";
import GameOverModal from "./components/GameOverModal";

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
  const { tick, success } = useHaptics();
  const completedRef = useRef(false);
  const { getEntries, addEntry } = useLeaderboard();

  const [mode, setMode] = useState<QuizMode>("free");
  const [freeActiveCode, setFreeActiveCode] = useState<string | null>(null);
  const [answeredCodes, setAnsweredCodes] = useState<Set<string>>(new Set());
  const [firstAttemptCodes, setFirstAttemptCodes] = useState<Set<string>>(
    new Set(),
  );
  const [lastResult, setLastResult] = useState<LastResult>(null);
  const [showFlag, setShowFlag] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [timerStoppedAt, setTimerStoppedAt] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    getEntries(),
  );

  const activeCode = mode === "directed" ? (queue[0] ?? null) : freeActiveCode;
  const activeCountry = activeCode
    ? (COUNTRY_MAP.get(activeCode) ?? null)
    : null;
  const pulsingCode = mode === "directed" ? (queue[0] ?? null) : null;
  const totalTimeSeconds =
    timerStartedAt !== null && timerStoppedAt !== null
      ? Math.floor((timerStoppedAt - timerStartedAt) / 1000)
      : 0;

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
    const directedDone =
      mode === "directed" && queue.length === 0 && answeredCodes.size === TOTAL;
    const freeDone = mode === "free" && answeredCodes.size === TOTAL;

    if ((directedDone || freeDone) && !completedRef.current) {
      completedRef.current = true;
      success();
      launchConfetti();
    }
    if (answeredCodes.size < TOTAL) {
      completedRef.current = false;
    }
  }, [answeredCodes.size, queue.length, mode, success, launchConfetti]);

  const resetState = useCallback(() => {
    setFreeActiveCode(null);
    setAnsweredCodes(new Set());
    setFirstAttemptCodes(new Set());
    setLastResult(null);
    setShowFlag(false);
    setTimerStartedAt(null);
    setTimerStoppedAt(null);
    setShowGameOver(false);
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

      if (mode === "directed" && timerStartedAt === null) {
        setTimerStartedAt(Date.now());
      }

      const correct =
        answersMatch(nameInput, activeCountry.name) &&
        answersMatch(capitalInput, activeCountry.capital);
      tick();
      if (correct) {
        if (!answeredCodes.has(activeCountry.code)) {
          setFirstAttemptCodes((prev) => {
            const n = new Set(prev);
            n.add(activeCountry.code);
            return n;
          });
        }
        setAnsweredCodes((prev) => {
          const next = new Set(prev);
          next.add(activeCountry.code);
          return next;
        });
      }
      setLastResult(correct ? "correct" : "wrong");
    },
    [activeCountry, tick, answeredCodes, mode, timerStartedAt],
  );

  const handleNext = useCallback(() => {
    if (mode === "directed") {
      if (lastResult === "correct") {
        if (queue.length === 1) {
          setTimerStoppedAt(Date.now());
          setShowGameOver(true);
        }
        setQueue((prev) => prev.slice(1));
      } else {
        setQueue((prev) => {
          const [current, ...rest] = prev;
          if (rest.length === 0) return [current!];
          const insertAt = Math.floor(Math.random() * (rest.length - 1)) + 1;
          const newQueue = [...rest];
          newQueue.splice(insertAt, 0, current!);
          return newQueue;
        });
      }
      setLastResult(null);
      setShowFlag(false);
    } else {
      setFreeActiveCode(null);
      setLastResult(null);
      setShowFlag(false);
    }
  }, [mode, lastResult, queue.length]);

  const handleSave = useCallback(
    (playerName: string, date: string) => {
      const start = timerStartedAt ?? 0;
      const stop = timerStoppedAt ?? Date.now();
      const entry: LeaderboardEntry = {
        name: playerName,
        firstTryScore: firstAttemptCodes.size,
        totalCountries: TOTAL,
        totalTimeSeconds: Math.floor((stop - start) / 1000),
        date,
      };
      const updated = addEntry(entry);
      setLeaderboard(updated);
    },
    [timerStartedAt, timerStoppedAt, firstAttemptCodes.size, addEntry],
  );

  const handleSkip = useCallback(() => {
    if (!activeCountry) return;
    if (mode === "directed" && timerStartedAt === null) {
      setTimerStartedAt(Date.now());
    }
    setLastResult("skipped");
  }, [activeCountry, mode, timerStartedAt]);

  const handleReplay = useCallback(() => {
    resetState();
    setQueue(shuffle(EU_COUNTRIES.map((c) => c.code)));
    setMode("directed");
  }, [resetState]);

  return (
    <div className="flex flex-col gap-4 py-4 px-4">
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

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {mode === "free" && answeredCodes.size === TOTAL && (
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
            isInteractive={mode === "free"}
          />
        </div>

        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-3">
          <div className="flex justify-center">
            <ModeToggle mode={mode} onChange={handleModeChange} />
          </div>

          {mode === "directed" && timerStartedAt !== null && (
            <Timer startedAt={timerStartedAt} stoppedAt={timerStoppedAt} />
          )}

          <QuizProgress answered={answeredCodes.size} total={TOTAL} />

          <QuizPanel
            key={activeCode ?? "empty"}
            country={activeCountry}
            mode={mode}
            lastResult={lastResult}
            showFlag={showFlag}
            onToggleFlag={() => setShowFlag((v) => !v)}
            onSubmit={handleSubmit}
            onNext={handleNext}
            onSkip={mode === "directed" ? handleSkip : undefined}
          />

          {answeredCodes.size > 0 && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={resetState}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50 active:scale-95"
                aria-label="Recommencer depuis le début"
              >
                <RotateCcw size={14} />
                Recommencer
              </button>
            </div>
          )}
        </div>
      </div>

      {showGameOver && (
        <GameOverModal
          firstTryScore={firstAttemptCodes.size}
          totalTimeSeconds={totalTimeSeconds}
          leaderboard={leaderboard}
          onSave={handleSave}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
};

export default MapQuizTab;
