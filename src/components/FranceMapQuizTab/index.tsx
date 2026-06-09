import { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useHaptics } from "../../utils/hapticPatterns";
import { Map as MapIcon, RotateCcw } from "lucide-react";
import {
  FRENCH_REGIONS,
  DOM_REGIONS,
  type Region,
} from "../../data/frenchRegions";
import { answersMatch } from "../../utils/normalizeAnswer";
import type { QuizMode, LastResult, FranceLeaderboardEntry } from "./types";
import { useLeaderboard } from "./hooks/useLeaderboard";
import ModeToggle from "../MapQuizTab/components/ModeToggle";
import Timer from "../MapQuizTab/components/Timer";
import QuizProgress from "../MapQuizTab/components/QuizProgress";
import LeaderboardPanel from "../MapQuizTab/components/LeaderboardPanel";
import FranceMap from "./components/FranceMap";
import FranceQuizPanel from "./components/FranceQuizPanel";
import DomMiniMap from "./components/DomMiniMap";
import GameOverModal from "./components/GameOverModal";

const TOTAL = FRENCH_REGIONS.length;
const REGION_MAP = new Map<string, Region>(
  FRENCH_REGIONS.map((r) => [r.code, r]),
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

const FranceMapQuizTab = () => {
  const { tick, success } = useHaptics();
  const completedRef = useRef(false);
  const { getEntries, addEntry } = useLeaderboard();

  const [mode, setMode] = useState<QuizMode>("free");
  const [freeActiveCode, setFreeActiveCode] = useState<string | null>(null);
  const [answeredCodes, setAnsweredCodes] = useState<Set<string>>(new Set());
  const [firstAttemptCodes, setFirstAttemptCodes] = useState<Set<string>>(
    new Set(),
  );
  const [failedCodes, setFailedCodes] = useState<Set<string>>(new Set());
  const [lastResult, setLastResult] = useState<LastResult>(null);
  const [queue, setQueue] = useState<string[]>([]);
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [timerStoppedAt, setTimerStoppedAt] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<FranceLeaderboardEntry[]>(() =>
    getEntries(),
  );

  const activeCode = mode === "directed" ? (queue[0] ?? null) : freeActiveCode;
  const activeRegion = activeCode ? (REGION_MAP.get(activeCode) ?? null) : null;
  const pulsingCode = mode === "directed" ? (queue[0] ?? null) : null;
  const totalTimeSeconds =
    timerStartedAt !== null && timerStoppedAt !== null
      ? Math.floor((timerStoppedAt - timerStartedAt) / 1000)
      : 0;

  const leaderboardForPanel = leaderboard.map(
    ({
      name,
      firstTryScore,
      hintScore,
      totalRegions,
      totalTimeSeconds: t,
      date,
    }) => ({
      name,
      firstTryScore,
      hintScore,
      totalCountries: totalRegions,
      totalTimeSeconds: t,
      date,
    }),
  );

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
    if (answeredCodes.size < TOTAL) completedRef.current = false;
  }, [answeredCodes.size, queue.length, mode, success, launchConfetti]);

  const resetState = useCallback(() => {
    setFreeActiveCode(null);
    setAnsweredCodes(new Set());
    setFirstAttemptCodes(new Set());
    setFailedCodes(new Set());
    setLastResult(null);
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
        setQueue(shuffle(FRENCH_REGIONS.map((r) => r.code)));
      } else {
        setQueue([]);
      }
    },
    [resetState],
  );

  const handleSelect = useCallback(
    (code: string) => {
      if (mode === "free") {
        setFreeActiveCode(code);
        setLastResult(null);
      }
    },
    [mode],
  );

  const handleGo = useCallback(() => {
    setTimerStartedAt(Date.now());
  }, []);

  const handleSubmit = useCallback(
    (nameInput: string, capitalInput: string) => {
      if (!activeRegion) return;
      const correct =
        answersMatch(nameInput, activeRegion.name) &&
        answersMatch(capitalInput, activeRegion.capital);
      tick();
      if (correct) {
        if (
          !failedCodes.has(activeRegion.code) &&
          !answeredCodes.has(activeRegion.code)
        ) {
          setFirstAttemptCodes((prev) => {
            const n = new Set(prev);
            n.add(activeRegion.code);
            return n;
          });
        }
        setAnsweredCodes((prev) => {
          const n = new Set(prev);
          n.add(activeRegion.code);
          return n;
        });
      } else {
        setFailedCodes((prev) => {
          const n = new Set(prev);
          n.add(activeRegion.code);
          return n;
        });
      }
      setLastResult(correct ? "correct" : "wrong");
    },
    [activeRegion, tick, answeredCodes, failedCodes],
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
    } else {
      setFreeActiveCode(null);
      setLastResult(null);
    }
  }, [mode, lastResult, queue.length]);

  const handleSkip = useCallback(() => {
    if (!activeRegion) return;
    setFailedCodes((prev) => {
      const n = new Set(prev);
      n.add(activeRegion.code);
      return n;
    });
    setLastResult("skipped");
  }, [activeRegion]);

  const handleSave = useCallback(
    (playerName: string, date: string) => {
      const start = timerStartedAt ?? 0;
      const stop = timerStoppedAt ?? Date.now();
      const entry: FranceLeaderboardEntry = {
        name: playerName,
        firstTryScore: firstAttemptCodes.size,
        totalRegions: TOTAL,
        totalTimeSeconds: Math.floor((stop - start) / 1000),
        date,
      };
      const updated = addEntry(entry);
      setLeaderboard(updated);
    },
    [timerStartedAt, timerStoppedAt, firstAttemptCodes.size, addEntry],
  );

  const handleReplay = useCallback(() => {
    resetState();
    setQueue(shuffle(FRENCH_REGIONS.map((r) => r.code)));
    setMode("directed");
  }, [resetState]);

  return (
    <div className="h-full flex flex-col gap-3 px-4 pt-4 pb-2 overflow-hidden">
      <div className="shrink-0 text-center pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <MapIcon size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Carte de France
          </h2>
          <MapIcon size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Identifie les régions et leurs chefs-lieux 🏛️
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 overflow-auto lg:overflow-hidden">
        <div className="lg:flex-1 min-w-0 lg:min-h-0 flex flex-col gap-3">
          {mode === "free" && answeredCodes.size === TOTAL && (
            <div
              className="shrink-0 rounded-3xl py-3 px-4 text-center border-2"
              style={{ background: "#f0fdf4", borderColor: "#86efac" }}
            >
              <p
                className="text-green-700 font-bold"
                style={{ fontFamily: "'Fredoka', system-ui, sans-serif" }}
              >
                🏆 Bravo ! Tu as identifié les {TOTAL} régions !
              </p>
            </div>
          )}

          <div className="lg:flex-1 lg:min-h-0 relative">
            <FranceMap
              activeCode={activeCode}
              answeredCodes={answeredCodes}
              pulsingCode={pulsingCode}
              onSelect={handleSelect}
              isInteractive={mode === "free"}
            />
            {/* DOM incrustés dans la zone océan à gauche de la métropole */}
            <div
              className="absolute inset-y-0 left-0 flex flex-col justify-center items-end gap-1"
              style={{ width: "27%", paddingRight: 6 }}
            >
              {DOM_REGIONS.map((region) => (
                <DomMiniMap
                  key={region.code}
                  code={region.code}
                  name={region.name}
                  isActive={region.code === activeCode}
                  isAnswered={answeredCodes.has(region.code)}
                  isPulsing={region.code === pulsingCode}
                  isInteractive={mode === "free"}
                  onSelect={() => handleSelect(region.code)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-3 lg:overflow-y-auto">
          <div className="flex justify-center">
            <ModeToggle mode={mode} onChange={handleModeChange} />
          </div>

          {mode === "directed" && timerStartedAt !== null && (
            <Timer startedAt={timerStartedAt} stoppedAt={timerStoppedAt} />
          )}

          <QuizProgress answered={answeredCodes.size} total={TOTAL} />

          {mode === "directed" && timerStartedAt === null ? (
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 border-purple-200 bg-purple-50">
              <p
                className="text-slate-500 text-sm font-semibold"
                style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
              >
                🔀 {queue.length} régions à identifier
              </p>
              <button
                type="button"
                onClick={handleGo}
                className="px-10 py-4 rounded-2xl font-bold text-2xl text-white shadow-lg active:scale-95 transition-transform"
                style={{
                  background: "#7e57c2",
                  fontFamily: "'Fredoka', system-ui, sans-serif",
                }}
                aria-label="Démarrer la partie"
              >
                GO !
              </button>
              <p
                className="text-slate-400 text-xs"
                style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
              >
                Le chrono démarre au GO
              </p>
            </div>
          ) : (
            <FranceQuizPanel
              key={activeCode ?? "empty"}
              region={activeRegion}
              mode={mode}
              lastResult={lastResult}
              onSubmit={handleSubmit}
              onNext={handleNext}
              onSkip={mode === "directed" ? handleSkip : undefined}
            />
          )}

          {mode === "directed" && (
            <LeaderboardPanel entries={leaderboardForPanel} />
          )}

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
          total={TOTAL}
          totalTimeSeconds={totalTimeSeconds}
          leaderboard={leaderboard}
          onSave={handleSave}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
};

export default FranceMapQuizTab;
