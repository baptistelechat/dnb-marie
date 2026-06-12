import { useState, useCallback } from "react";
import { Landmark, RotateCcw } from "lucide-react";
import { EU_COUNTRIES, type Country } from "../../data/euCountries";
import { answersMatch } from "../../utils/normalizeAnswer";
import { useHaptics } from "../../utils/hapticPatterns";
import type {
  CapitalsDirection,
  CapitalsLastResult,
  CapitalsLeaderboardEntry,
} from "./types";
import { useCapitalsLeaderboard } from "./hooks/useCapitalsLeaderboard";
import QuizCard from "./components/QuizCard";
import AnswerInput from "./components/AnswerInput";
import DirectionToggle from "./components/DirectionToggle";
import CapitalsProgress from "./components/CapitalsProgress";
import CapitalsGameOverModal from "./components/CapitalsGameOverModal";
import Timer from "../MapQuizTab/components/Timer";
import LeaderboardPanel from "../MapQuizTab/components/LeaderboardPanel";

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

const CapitalsQuizTab = () => {
  const { tick, success } = useHaptics();
  const { getEntries, addEntry } = useCapitalsLeaderboard();

  const [direction, setDirection] =
    useState<CapitalsDirection>("country-to-capital");
  const [answeredCodes, setAnsweredCodes] = useState<Set<string>>(new Set());
  const [firstAttemptCodes, setFirstAttemptCodes] = useState<Set<string>>(
    new Set(),
  );
  const [hintSuccessCodes, setHintSuccessCodes] = useState<Set<string>>(
    new Set(),
  );
  const [failedCodes, setFailedCodes] = useState<Set<string>>(new Set());
  const [lastResult, setLastResult] = useState<CapitalsLastResult>(null);
  const [queue, setQueue] = useState<string[]>(() =>
    shuffle(EU_COUNTRIES.map((c) => c.code)),
  );
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [timerStoppedAt, setTimerStoppedAt] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<CapitalsLeaderboardEntry[]>(
    () => getEntries("country-to-capital"),
  );

  const activeCode = queue[0] ?? null;
  const activeCountry = activeCode
    ? (COUNTRY_MAP.get(activeCode) ?? null)
    : null;

  const leaderboardForPanel = leaderboard.map(
    ({ name, firstTryScore, totalCountries, totalTimeSeconds, date }) => ({
      name,
      firstTryScore,
      totalCountries,
      totalTimeSeconds,
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
    (newDirection: CapitalsDirection) => {
      resetState();
      setDirection(newDirection);
      setQueue(shuffle(EU_COUNTRIES.map((c) => c.code)));
      setLeaderboard(getEntries(newDirection));
    },
    [resetState, getEntries],
  );

  const handleGo = useCallback(() => {
    setTimerStartedAt(Date.now());
  }, []);

  const handleSubmit = useCallback(
    (answer: string, hintUsed: boolean) => {
      if (!activeCountry) return;
      const correct =
        direction === "country-to-capital"
          ? answersMatch(answer, activeCountry.capital)
          : answersMatch(answer, activeCountry.name);
      tick();
      if (correct) {
        const isFirstTry =
          !failedCodes.has(activeCountry.code) &&
          !answeredCodes.has(activeCountry.code);
        if (isFirstTry) {
          if (hintUsed) {
            setHintSuccessCodes((prev) => {
              const n = new Set(prev);
              n.add(activeCountry.code);
              return n;
            });
          } else {
            setFirstAttemptCodes((prev) => {
              const n = new Set(prev);
              n.add(activeCountry.code);
              return n;
            });
          }
        }
        setAnsweredCodes((prev) => {
          const n = new Set(prev);
          n.add(activeCountry.code);
          return n;
        });
      } else {
        setFailedCodes((prev) => {
          const n = new Set(prev);
          n.add(activeCountry.code);
          return n;
        });
      }
      setLastResult(correct ? "correct" : "wrong");
    },
    [activeCountry, direction, tick, answeredCodes, failedCodes],
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
    if (!activeCountry) return;
    setFailedCodes((prev) => {
      const n = new Set(prev);
      n.add(activeCountry.code);
      return n;
    });
    setLastResult("skipped");
  }, [activeCountry]);

  const handleSave = useCallback(
    (playerName: string, date: string) => {
      const start = timerStartedAt ?? 0;
      const stop = timerStoppedAt ?? Date.now();
      const entry: CapitalsLeaderboardEntry = {
        name: playerName,
        firstTryScore: firstAttemptCodes.size,
        hintScore: hintSuccessCodes.size,
        totalCountries: TOTAL,
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
    setQueue(shuffle(EU_COUNTRIES.map((c) => c.code)));
  }, [resetState]);

  const totalTimeSeconds =
    timerStartedAt !== null && timerStoppedAt !== null
      ? Math.floor((timerStoppedAt - timerStartedAt) / 1000)
      : 0;

  const answersPool =
    direction === "country-to-capital"
      ? EU_COUNTRIES.map((c) => c.capital)
      : EU_COUNTRIES.map((c) => c.name);

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
          Maîtrise les capitales de l&apos;Union Européenne 🏛️
        </p>
      </div>

      <div className="flex justify-center">
        <DirectionToggle
          direction={direction}
          onChange={handleDirectionChange}
        />
      </div>

      {timerStartedAt !== null && (
        <Timer startedAt={timerStartedAt} stoppedAt={timerStoppedAt} />
      )}

      <CapitalsProgress answered={answeredCodes.size} total={TOTAL} />

      {timerStartedAt === null ? (
        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 border-purple-200 bg-purple-50">
          <p
            className="text-slate-500 text-sm font-semibold"
            style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
          >
            🃏 {queue.length} pays à identifier
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
          <QuizCard
            key={activeCode ?? "empty"}
            country={activeCountry}
            direction={direction}
          />
          <AnswerInput
            key={`${activeCode ?? "empty"}-${lastResult ?? "null"}`}
            direction={direction}
            lastResult={lastResult}
            country={activeCountry}
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50 active:scale-95"
            aria-label="Recommencer depuis le début"
          >
            <RotateCcw size={14} />
            Recommencer
          </button>
        </div>
      )}

      {showGameOver && (
        <CapitalsGameOverModal
          firstTryScore={firstAttemptCodes.size}
          hintScore={hintSuccessCodes.size}
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

export default CapitalsQuizTab;
