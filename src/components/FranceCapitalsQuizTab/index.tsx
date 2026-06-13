import { useState, useCallback } from "react";
import { Landmark, RotateCcw } from "lucide-react";
import { FRENCH_REGIONS, type Region } from "../../data/frenchRegions";
import { answersMatch } from "../../utils/normalizeAnswer";
import { useHaptics } from "../../utils/hapticPatterns";
import type {
  FranceCapitalsDirection,
  FranceCapitalsLastResult,
  FranceCapitalsLeaderboardEntry,
} from "./types";
import { useFranceCapitalsLeaderboard } from "./hooks/useLeaderboard";
import RegionQuizCard from "./components/RegionQuizCard";
import FranceAnswerInput from "./components/FranceAnswerInput";
import FranceDirectionToggle from "./components/FranceDirectionToggle";
import FranceCapitalsProgress from "./components/FranceCapitalsProgress";
import FranceCapitalsGameOverModal from "./components/FranceCapitalsGameOverModal";
import Timer from "../MapQuizTab/components/Timer";
import LeaderboardPanel from "../MapQuizTab/components/LeaderboardPanel";

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

const FranceCapitalsQuizTab = () => {
  const { tick, success } = useHaptics();
  const { getEntries, addEntry } = useFranceCapitalsLeaderboard();

  const [direction, setDirection] =
    useState<FranceCapitalsDirection>("region-to-capital");
  const [answeredCodes, setAnsweredCodes] = useState<Set<string>>(new Set());
  const [firstAttemptCodes, setFirstAttemptCodes] = useState<Set<string>>(
    new Set(),
  );
  const [hintSuccessCodes, setHintSuccessCodes] = useState<Set<string>>(
    new Set(),
  );
  const [failedCodes, setFailedCodes] = useState<Set<string>>(new Set());
  const [lastResult, setLastResult] = useState<FranceCapitalsLastResult>(null);
  const [queue, setQueue] = useState<string[]>(() =>
    shuffle(FRENCH_REGIONS.map((r) => r.code)),
  );
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [timerStoppedAt, setTimerStoppedAt] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<
    FranceCapitalsLeaderboardEntry[]
  >(() => getEntries("region-to-capital"));

  const activeCode = queue[0] ?? null;
  const activeRegion = activeCode ? (REGION_MAP.get(activeCode) ?? null) : null;

  const totalTimeSeconds =
    timerStartedAt !== null && timerStoppedAt !== null
      ? Math.floor((timerStoppedAt - timerStartedAt) / 1000)
      : 0;

  const leaderboardForPanel = leaderboard.map(
    ({ name, firstTryScore, totalRegions, totalTimeSeconds: t, date }) => ({
      name,
      firstTryScore,
      totalCountries: totalRegions,
      totalTimeSeconds: t,
      date,
    }),
  );

  const resetState = useCallback(() => {
    setAnsweredCodes(new Set());
    setFirstAttemptCodes(new Set());
    setHintSuccessCodes(new Set());
    setFailedCodes(new Set());
    setLastResult(null);
    setTimerStartedAt(null);
    setTimerStoppedAt(null);
    setShowGameOver(false);
  }, []);

  const handleDirectionChange = useCallback(
    (newDirection: FranceCapitalsDirection) => {
      resetState();
      setDirection(newDirection);
      setQueue(shuffle(FRENCH_REGIONS.map((r) => r.code)));
      setLeaderboard(getEntries(newDirection));
    },
    [resetState, getEntries],
  );

  const handleGo = useCallback(() => {
    setTimerStartedAt(Date.now());
  }, []);

  const handleSubmit = useCallback(
    (answer: string, hintUsed: boolean) => {
      if (!activeRegion) return;
      const correct =
        direction === "region-to-capital"
          ? answersMatch(answer, activeRegion.capital)
          : answersMatch(answer, activeRegion.name);
      tick();
      if (correct) {
        const isFirstTry =
          !failedCodes.has(activeRegion.code) &&
          !answeredCodes.has(activeRegion.code);
        if (isFirstTry) {
          if (hintUsed) {
            setHintSuccessCodes((prev) => {
              const n = new Set(prev);
              n.add(activeRegion.code);
              return n;
            });
          } else {
            setFirstAttemptCodes((prev) => {
              const n = new Set(prev);
              n.add(activeRegion.code);
              return n;
            });
          }
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
    [activeRegion, direction, tick, answeredCodes, failedCodes],
  );

  const handleNext = useCallback(() => {
    if (lastResult === "correct") {
      if (queue.length === 1) {
        setTimerStoppedAt(Date.now());
        setShowGameOver(true);
        success();
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
  }, [lastResult, queue.length, success]);

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
      const entry: FranceCapitalsLeaderboardEntry = {
        name: playerName,
        firstTryScore: firstAttemptCodes.size,
        hintScore: hintSuccessCodes.size,
        totalRegions: TOTAL,
        totalTimeSeconds: Math.floor((stop - start) / 1000),
        date,
        direction,
      };
      const updated = addEntry(entry);
      setLeaderboard(updated);
    },
    [
      timerStartedAt,
      timerStoppedAt,
      firstAttemptCodes.size,
      hintSuccessCodes.size,
      addEntry,
      direction,
    ],
  );

  const handleReplay = useCallback(() => {
    resetState();
    setQueue(shuffle(FRENCH_REGIONS.map((r) => r.code)));
  }, [resetState]);

  const answersPool =
    direction === "region-to-capital"
      ? FRENCH_REGIONS.map((r) => r.capital)
      : FRENCH_REGIONS.map((r) => r.name);

  return (
    <div className="flex flex-col gap-4 py-4 px-4 max-w-2xl mx-auto">
      <div className="text-center pt-3 pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Landmark size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Flashcards
          </h2>
          <Landmark size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Maîtrise les chefs-lieux des régions françaises 🏛️
        </p>
      </div>

      <div className="flex justify-center">
        <FranceDirectionToggle
          direction={direction}
          onChange={handleDirectionChange}
        />
      </div>

      {timerStartedAt !== null && (
        <Timer startedAt={timerStartedAt} stoppedAt={timerStoppedAt} />
      )}

      <FranceCapitalsProgress answered={answeredCodes.size} total={TOTAL} />

      {timerStartedAt === null ? (
        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 border-purple-200 bg-purple-50">
          <p
            className="text-slate-500 text-sm font-semibold"
            style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
          >
            🃏 {queue.length} régions à identifier
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
        <>
          <RegionQuizCard
            key={activeCode ?? "empty"}
            region={activeRegion}
            direction={direction}
          />
          <FranceAnswerInput
            key={`${activeCode ?? "empty"}-${lastResult ?? "null"}`}
            direction={direction}
            lastResult={lastResult}
            region={activeRegion}
            pool={answersPool}
            onSubmit={handleSubmit}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        </>
      )}

      <LeaderboardPanel entries={leaderboardForPanel} />

      {answeredCodes.size > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleReplay}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50 active:scale-95"
            aria-label="Recommencer depuis le début"
          >
            <RotateCcw size={14} />
            Recommencer
          </button>
        </div>
      )}

      {showGameOver && (
        <FranceCapitalsGameOverModal
          firstTryScore={firstAttemptCodes.size}
          hintScore={hintSuccessCodes.size}
          total={TOTAL}
          totalTimeSeconds={totalTimeSeconds}
          leaderboard={leaderboard}
          direction={direction}
          onSave={handleSave}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
};

export default FranceCapitalsQuizTab;
