import { useState, useCallback } from "react";
import { Layers, RotateCcw } from "lucide-react";
import {
  HISTORICAL_DATES,
  type HistoricalDate,
} from "../../data/historicalDates";
import { answersMatch } from "../../utils/normalizeAnswer";
import { datesMatch } from "../../utils/normalizeDateAnswer";
import { useHaptics } from "../../utils/hapticPatterns";
import type {
  HistoryDatesFlashcardDirection,
  HistoryDatesLastResult,
  HistoryDatesLeaderboardEntry,
} from "./types";
import { useHistoryDatesLeaderboard } from "./hooks/useHistoryDatesLeaderboard";
import DateQuizCard from "./components/DateQuizCard";
import DateAnswerInput from "./components/DateAnswerInput";
import HistoryDatesDirectionToggle from "./components/HistoryDatesDirectionToggle";
import HistoryDatesGameOverModal from "./components/HistoryDatesGameOverModal";
import Timer from "../MapQuizTab/components/Timer";
import LeaderboardPanel from "../MapQuizTab/components/LeaderboardPanel";

const TOTAL = HISTORICAL_DATES.length;
const ALL_DATES = HISTORICAL_DATES.map((d) => d.date);
const ALL_EVENTS = HISTORICAL_DATES.map((d) => d.event);
const DATE_MAP = new Map<string, HistoricalDate>(
  HISTORICAL_DATES.map((d) => [d.id, d]),
);

const shuffle = (ids: string[]): string[] => {
  const arr = [...ids];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j]!;
    arr[j] = tmp!;
  }
  return arr;
};

const HistoryDatesFlashcardTab = () => {
  const { tick, success } = useHaptics();
  const { getEntries, addEntry } = useHistoryDatesLeaderboard();

  const [direction, setDirection] =
    useState<HistoryDatesFlashcardDirection>("date-to-event");
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [firstAttemptIds, setFirstAttemptIds] = useState<Set<string>>(
    new Set(),
  );
  const [hintIds, setHintIds] = useState<Set<string>>(new Set());
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const [lastResult, setLastResult] = useState<HistoryDatesLastResult>(null);
  const [queue, setQueue] = useState<string[]>(() =>
    shuffle(HISTORICAL_DATES.map((d) => d.id)),
  );
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [timerStoppedAt, setTimerStoppedAt] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<
    HistoryDatesLeaderboardEntry[]
  >(() => getEntries("date-to-event"));

  const activeId = queue[0] ?? null;
  const activeItem = activeId ? (DATE_MAP.get(activeId) ?? null) : null;
  const pool = direction === "date-to-event" ? ALL_EVENTS : ALL_DATES;

  const leaderboardForPanel = leaderboard.map(
    ({
      name,
      firstTryScore,
      hintScore,
      totalItems,
      totalTimeSeconds,
      date,
    }) => ({
      name,
      firstTryScore,
      hintScore,
      totalCountries: totalItems,
      totalTimeSeconds,
      date,
    }),
  );

  const resetState = useCallback(() => {
    setAnsweredIds(new Set());
    setFirstAttemptIds(new Set());
    setHintIds(new Set());
    setFailedIds(new Set());
    setLastResult(null);
    setTimerStartedAt(null);
    setTimerStoppedAt(null);
    setShowGameOver(false);
  }, []);

  const handleDirectionChange = useCallback(
    (newDirection: HistoryDatesFlashcardDirection) => {
      resetState();
      setDirection(newDirection);
      setQueue(shuffle(HISTORICAL_DATES.map((d) => d.id)));
      setLeaderboard(getEntries(newDirection));
    },
    [resetState, getEntries],
  );

  const handleGo = useCallback(() => {
    setTimerStartedAt(Date.now());
  }, []);

  const handleSubmit = useCallback(
    (answer: string, hintUsed: boolean) => {
      if (!activeItem) return;
      const correct =
        direction === "date-to-event"
          ? answersMatch(answer, activeItem.event)
          : datesMatch(answer, activeItem.date);
      tick();
      if (correct) {
        if (!failedIds.has(activeItem.id) && !answeredIds.has(activeItem.id)) {
          if (hintUsed) {
            setHintIds((prev) => new Set(prev).add(activeItem.id));
          } else {
            setFirstAttemptIds((prev) => new Set(prev).add(activeItem.id));
          }
        }
        setAnsweredIds((prev) => new Set(prev).add(activeItem.id));
      } else {
        setFailedIds((prev) => new Set(prev).add(activeItem.id));
      }
      setLastResult(correct ? "correct" : "wrong");
    },
    [activeItem, direction, tick, failedIds, answeredIds],
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
    if (!activeItem) return;
    setFailedIds((prev) => new Set(prev).add(activeItem.id));
    setLastResult("skipped");
  }, [activeItem]);

  const handleSave = useCallback(
    (playerName: string, date: string) => {
      const start = timerStartedAt ?? 0;
      const stop = timerStoppedAt ?? Date.now();
      const entry: HistoryDatesLeaderboardEntry = {
        name: playerName,
        firstTryScore: firstAttemptIds.size,
        hintScore: hintIds.size,
        totalItems: TOTAL,
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
      firstAttemptIds.size,
      hintIds.size,
      addEntry,
      direction,
    ],
  );

  const handleReplay = useCallback(() => {
    resetState();
    setQueue(shuffle(HISTORICAL_DATES.map((d) => d.id)));
  }, [resetState]);

  const totalTimeSeconds =
    timerStartedAt !== null && timerStoppedAt !== null
      ? Math.floor((timerStoppedAt - timerStartedAt) / 1000)
      : 0;

  return (
    <div className="flex flex-col gap-4 py-4 px-4 max-w-2xl mx-auto">
      <div className="text-center pt-3 pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Layers size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Flashcards
          </h2>
          <Layers size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Maîtrise les dates clés de l&apos;Histoire 📅
        </p>
      </div>

      <div className="flex justify-center">
        <HistoryDatesDirectionToggle
          direction={direction}
          onChange={handleDirectionChange}
        />
      </div>

      {timerStartedAt !== null && (
        <Timer startedAt={timerStartedAt} stoppedAt={timerStoppedAt} />
      )}

      <div
        className="rounded-2xl px-4 py-2 flex items-center justify-between"
        style={{ background: "#f5f0fb" }}
      >
        <span
          className="text-sm font-semibold"
          style={{
            color: "#9575cd",
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          Progression
        </span>
        <span
          className="font-bold text-sm"
          style={{
            color: "#7e57c2",
            fontFamily: "'Fredoka', system-ui, sans-serif",
          }}
        >
          {answeredIds.size} / {TOTAL}
        </span>
      </div>

      {timerStartedAt === null ? (
        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 border-purple-200 bg-purple-50">
          <p
            className="text-slate-500 text-sm font-semibold"
            style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
          >
            🃏 {queue.length} dates à identifier
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
          <DateQuizCard
            key={activeId ?? "empty"}
            item={activeItem}
            direction={direction}
          />
          <DateAnswerInput
            key={`${activeId ?? "empty"}-${lastResult ?? "null"}`}
            direction={direction}
            lastResult={lastResult}
            item={activeItem}
            pool={pool}
            onSubmit={handleSubmit}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        </>
      )}

      <LeaderboardPanel entries={leaderboardForPanel} />

      {answeredIds.size > 0 && (
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
        <HistoryDatesGameOverModal
          firstTryScore={firstAttemptIds.size}
          hintScore={hintIds.size}
          totalItems={TOTAL}
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

export default HistoryDatesFlashcardTab;
