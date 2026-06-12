import { useState, useCallback } from "react";
import { HelpCircle, RotateCcw } from "lucide-react";
import { HISTORICAL_FIGURES } from "../../data/historicalFigures";
import { personNamesMatch } from "../../utils/normalizePersonName";
import { useHaptics } from "../../utils/hapticPatterns";
import type { QSJLastResult, QSJLeaderboardEntry } from "./types";
import { useQSJLeaderboard } from "./hooks/useQSJLeaderboard";
import ClueCard from "./components/ClueCard";
import QSJInput from "./components/QSJInput";
import QSJGameOverModal from "./components/QSJGameOverModal";
import Timer from "../MapQuizTab/components/Timer";
import LeaderboardPanel from "../MapQuizTab/components/LeaderboardPanel";

const TOTAL = HISTORICAL_FIGURES.length;

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

const QuiSuisJeTab = () => {
  const { tick, success } = useHaptics();
  const { getEntries, addEntry } = useQSJLeaderboard();

  const [queue, setQueue] = useState<string[]>(() =>
    shuffle(HISTORICAL_FIGURES.map((f) => f.id)),
  );
  const [shuffledClues, setShuffledClues] = useState<Map<string, string[]>>(
    () => new Map(HISTORICAL_FIGURES.map((f) => [f.id, shuffle([...f.clues])])),
  );
  const [revealedCount, setRevealedCount] = useState(1);
  const [lastResult, setLastResult] = useState<QSJLastResult>(null);
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [firstTryIds, setFirstTryIds] = useState<Set<string>>(new Set());
  const [hintTryIds, setHintTryIds] = useState<Set<string>>(new Set());
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [timerStoppedAt, setTimerStoppedAt] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<QSJLeaderboardEntry[]>(() =>
    getEntries(),
  );

  const activeId = queue[0] ?? null;
  const activeFigure = activeId
    ? (HISTORICAL_FIGURES.find((f) => f.id === activeId) ?? null)
    : null;
  const activeClues = activeId ? (shuffledClues.get(activeId) ?? []) : [];

  const canRevealNextClue =
    activeFigure !== null &&
    revealedCount < activeClues.length &&
    lastResult === "wrong";

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
    setFirstTryIds(new Set());
    setHintTryIds(new Set());
    setFailedIds(new Set());
    setRevealedCount(1);
    setLastResult(null);
    setTimerStartedAt(null);
    setTimerStoppedAt(null);
    setShowGameOver(false);
  }, []);

  const handleGo = useCallback(() => {
    setTimerStartedAt(Date.now());
  }, []);

  const handleSubmit = useCallback(
    (answer: string) => {
      if (!activeFigure) return;
      const correct = personNamesMatch(answer, activeFigure.name);
      tick();
      if (correct) {
        if (!answeredIds.has(activeFigure.id)) {
          if (revealedCount === 1) {
            setFirstTryIds((prev) => new Set(prev).add(activeFigure.id));
          } else {
            setHintTryIds((prev) => new Set(prev).add(activeFigure.id));
          }
          setAnsweredIds((prev) => new Set(prev).add(activeFigure.id));
        }
        setLastResult("correct");
      } else {
        if (revealedCount >= activeFigure.clues.length) {
          setFailedIds((prev) => new Set(prev).add(activeFigure.id));
        }
        setLastResult("wrong");
      }
    },
    [activeFigure, tick, revealedCount, answeredIds],
  );

  const handleRevealNextClue = useCallback(() => {
    setRevealedCount((prev) => prev + 1);
    setLastResult(null);
  }, []);

  const handleSkip = useCallback(() => {
    if (!activeFigure) return;
    setFailedIds((prev) => new Set(prev).add(activeFigure.id));
    setLastResult("skipped");
  }, [activeFigure]);

  const handleNext = useCallback(() => {
    if (queue.length === 1) {
      setTimerStoppedAt(Date.now());
      setShowGameOver(true);
      success();
    }
    setQueue((prev) => prev.slice(1));
    setRevealedCount(1);
    setLastResult(null);
  }, [queue.length, success]);

  const handleSave = useCallback(
    (playerName: string, date: string) => {
      const start = timerStartedAt ?? 0;
      const stop = timerStoppedAt ?? Date.now();
      const entry: QSJLeaderboardEntry = {
        name: playerName,
        firstTryScore: firstTryIds.size,
        hintScore: hintTryIds.size,
        totalItems: TOTAL,
        totalTimeSeconds: Math.floor((stop - start) / 1000),
        date,
      };
      const updated = addEntry(entry);
      setLeaderboard(updated);
    },
    [
      timerStartedAt,
      timerStoppedAt,
      firstTryIds.size,
      hintTryIds.size,
      addEntry,
    ],
  );

  const handleReplay = useCallback(() => {
    resetState();
    setQueue(shuffle(HISTORICAL_FIGURES.map((f) => f.id)));
    setShuffledClues(
      new Map(HISTORICAL_FIGURES.map((f) => [f.id, shuffle([...f.clues])])),
    );
  }, [resetState]);

  const totalTimeSeconds =
    timerStartedAt !== null && timerStoppedAt !== null
      ? Math.floor((timerStoppedAt - timerStartedAt) / 1000)
      : 0;

  const doneCount = answeredIds.size + failedIds.size;

  return (
    <div className="flex flex-col gap-4 py-4 px-4 max-w-2xl mx-auto">
      <div className="text-center pt-3 pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <HelpCircle size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Qui suis-je ?
          </h2>
          <HelpCircle size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Devine le personnage à partir des indices 🔍
        </p>
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
          {doneCount} / {TOTAL}
        </span>
      </div>

      {timerStartedAt === null ? (
        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 border-purple-200 bg-purple-50">
          <p
            className="text-slate-500 text-sm font-semibold"
            style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
          >
            🔍 {TOTAL} personnages à identifier
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
        activeFigure && (
          <>
            <ClueCard
              key={activeId}
              clues={activeClues}
              revealedCount={revealedCount}
            />
            <QSJInput
              key={`${activeId ?? "empty"}-${revealedCount}`}
              lastResult={lastResult}
              correctName={activeFigure.name}
              canRevealNextClue={canRevealNextClue}
              onSubmit={handleSubmit}
              onRevealNextClue={handleRevealNextClue}
              onSkip={handleSkip}
              onNext={handleNext}
            />
          </>
        )
      )}

      <LeaderboardPanel entries={leaderboardForPanel} />

      {doneCount > 0 && (
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
        <QSJGameOverModal
          firstTryScore={firstTryIds.size}
          hintScore={hintTryIds.size}
          totalItems={TOTAL}
          totalTimeSeconds={totalTimeSeconds}
          leaderboard={leaderboard}
          onSave={handleSave}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
};

export default QuiSuisJeTab;
