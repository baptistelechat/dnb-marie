import { useState, useCallback, useMemo } from "react";
import { Camera, RotateCcw } from "lucide-react";
import { HISTORICAL_FIGURES } from "../../data/historicalFigures";
import { personNamesMatch } from "../../utils/normalizePersonName";
import { useHaptics } from "../../utils/hapticPatterns";
import type {
  PhotoLastResult,
  PhotoLeaderboardEntry,
  PhotoEntry,
} from "./types";
import { usePhotoLeaderboard } from "./hooks/usePhotoLeaderboard";
import PhotoCard from "./components/PhotoCard";
import PersonNameInput from "./components/PersonNameInput";
import PhotoGameOverModal from "./components/PhotoGameOverModal";
import Timer from "../MapQuizTab/components/Timer";
import LeaderboardPanel from "../MapQuizTab/components/LeaderboardPanel";

// 1 photo aléatoire par personnage → 11 cartes par partie
const buildRoundPool = (): PhotoEntry[] =>
  HISTORICAL_FIGURES.map((fig) => {
    const photoIndex = Math.floor(Math.random() * fig.photos.length);
    return {
      entryId: `${fig.id}-${photoIndex}`,
      photoUrl: fig.photos[photoIndex]!,
      figureName: fig.name,
      figurePeriod: fig.period,
      figureId: fig.id,
    };
  });

const TOTAL = HISTORICAL_FIGURES.length;
const ALL_NAMES = HISTORICAL_FIGURES.map((f) => f.name);

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

const PhotoFlashcardTab = () => {
  const { tick, success } = useHaptics();
  const { getEntries, addEntry } = usePhotoLeaderboard();

  const [roundPool, setRoundPool] = useState<PhotoEntry[]>(() =>
    buildRoundPool(),
  );
  const roundMap = useMemo(
    () => new Map(roundPool.map((e) => [e.entryId, e])),
    [roundPool],
  );

  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [firstAttemptIds, setFirstAttemptIds] = useState<Set<string>>(
    new Set(),
  );
  const [hintIds, setHintIds] = useState<Set<string>>(new Set());
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const [lastResult, setLastResult] = useState<PhotoLastResult>(null);
  const [queue, setQueue] = useState<string[]>(() =>
    shuffle(roundPool.map((e) => e.entryId)),
  );
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [timerStoppedAt, setTimerStoppedAt] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<PhotoLeaderboardEntry[]>(() =>
    getEntries(),
  );

  const activeId = queue[0] ?? null;
  const activeEntry = activeId ? (roundMap.get(activeId) ?? null) : null;

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

  const handleGo = useCallback(() => {
    setTimerStartedAt(Date.now());
  }, []);

  const handleSubmit = useCallback(
    (answer: string, hintUsed: boolean) => {
      if (!activeEntry) return;
      const correct = personNamesMatch(answer, activeEntry.figureName);
      tick();
      if (correct) {
        if (
          !failedIds.has(activeEntry.entryId) &&
          !answeredIds.has(activeEntry.entryId)
        ) {
          if (hintUsed) {
            setHintIds((prev) => new Set(prev).add(activeEntry.entryId));
          } else {
            setFirstAttemptIds((prev) =>
              new Set(prev).add(activeEntry.entryId),
            );
          }
        }
        setAnsweredIds((prev) => new Set(prev).add(activeEntry.entryId));
      } else {
        setFailedIds((prev) => new Set(prev).add(activeEntry.entryId));
      }
      setLastResult(correct ? "correct" : "wrong");
    },
    [activeEntry, tick, failedIds, answeredIds],
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
    if (!activeEntry) return;
    setFailedIds((prev) => new Set(prev).add(activeEntry.entryId));
    setLastResult("skipped");
  }, [activeEntry]);

  const handleSave = useCallback(
    (playerName: string, date: string) => {
      const start = timerStartedAt ?? 0;
      const stop = timerStoppedAt ?? Date.now();
      const entry: PhotoLeaderboardEntry = {
        name: playerName,
        firstTryScore: firstAttemptIds.size,
        hintScore: hintIds.size,
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
      firstAttemptIds.size,
      hintIds.size,
      addEntry,
    ],
  );

  const handleReplay = useCallback(() => {
    const newPool = buildRoundPool();
    setRoundPool(newPool);
    resetState();
    setQueue(shuffle(newPool.map((e) => e.entryId)));
  }, [resetState]);

  const totalTimeSeconds =
    timerStartedAt !== null && timerStoppedAt !== null
      ? Math.floor((timerStoppedAt - timerStartedAt) / 1000)
      : 0;

  return (
    <div className="flex flex-col gap-4 py-4 px-4 max-w-2xl mx-auto">
      <div className="text-center pt-3 pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Camera size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Photos
          </h2>
          <Camera size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Reconnais les personnages historiques 📸
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
          {answeredIds.size} / {TOTAL}
        </span>
      </div>

      {timerStartedAt === null ? (
        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 border-purple-200 bg-purple-50">
          <p
            className="text-slate-500 text-sm font-semibold"
            style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
          >
            📸 {queue.length} photos à identifier
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
          <PhotoCard key={activeId ?? "empty"} entry={activeEntry} />
          <PersonNameInput
            key={`${activeId ?? "empty"}-${lastResult ?? "null"}`}
            lastResult={lastResult}
            correctName={activeEntry?.figureName ?? ""}
            pool={ALL_NAMES}
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50 active:scale-95"
            aria-label="Recommencer depuis le début"
          >
            <RotateCcw size={14} />
            Recommencer
          </button>
        </div>
      )}

      {showGameOver && (
        <PhotoGameOverModal
          firstTryScore={firstAttemptIds.size}
          hintScore={hintIds.size}
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

export default PhotoFlashcardTab;
