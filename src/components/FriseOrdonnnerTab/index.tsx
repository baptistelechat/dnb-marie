import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { ArrowUpDown, Clock, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { initGame, ROUND_SIZE } from "./utils";
import type { GameItem, OrdonnerLeaderboardEntry } from "./types";
import { useOrdonnerLeaderboard } from "./hooks/useOrdonnerLeaderboard";
import { useHaptics } from "../../utils/hapticPatterns";
import GameTimeline from "./components/GameTimeline";
import DraggableEventCard from "./components/DraggableEventCard";
import OrdonnerGameOverModal from "./components/OrdonnerGameOverModal";
import ProgressBar from "../shared/ProgressBar";

const SHAKE_DURATION_MS = 500;
const MEDALS = ["🥇", "🥈", "🥉"];

const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};

const formatAge = (dateISO: string): string => {
  const diffDays = Math.floor(
    (Date.now() - new Date(dateISO).getTime()) / 86_400_000,
  );
  if (diffDays === 0) return "aujourd'hui";
  if (diffDays === 1) return "hier";
  if (diffDays < 7) return `il y a ${diffDays}j`;
  if (diffDays < 30) return `il y a ${Math.floor(diffDays / 7)} sem`;
  return `il y a ${Math.floor(diffDays / 30)} mois`;
};

const FriseOrdonnnerTab = () => {
  const { getEntries, addEntry } = useOrdonnerLeaderboard();
  const { tick, success } = useHaptics();

  const [items, setItems] = useState<GameItem[]>(() => initGame());
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<OrdonnerLeaderboardEntry[]>(
    () => getEntries(),
  );
  const correctCountRef = useRef(0);

  // Chrono live
  useEffect(() => {
    if (!timerStartedAt || gameOver) return;
    const id = setInterval(() => {
      setLiveSeconds(Math.floor((Date.now() - timerStartedAt) / 1000));
    }, 500);
    return () => clearInterval(id);
  }, [timerStartedAt, gameOver]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
  );

  const correctCount = useMemo(
    () => items.filter((i) => i.state === "correct").length,
    [items],
  );
  const freeScore = useMemo(
    () =>
      items.filter((i) => i.state === "correct" && !i.firstTryFailed).length,
    [items],
  );
  const pendingItems = useMemo(
    () => items.filter((i) => i.state === "idle"),
    [items],
  );

  const handleStart = useCallback(() => {
    setTimerStartedAt(Date.now());
    setLiveSeconds(0);
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      if (active.id === over.id) {
        tick();
        correctCountRef.current += 1;
        setItems((prev) =>
          prev.map((item) =>
            item.id === active.id
              ? { ...item, state: "correct" as const }
              : item,
          ),
        );
        if (correctCountRef.current === ROUND_SIZE) {
          const elapsed = Math.floor(
            (Date.now() - (timerStartedAt ?? Date.now())) / 1000,
          );
          setElapsedSeconds(elapsed);
          setGameOver(true);
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
      } else {
        tick();
        setItems((prev) =>
          prev.map((item) =>
            item.id === active.id ? { ...item, firstTryFailed: true } : item,
          ),
        );
        setWrongId(active.id as string);
        setTimeout(() => setWrongId(null), SHAKE_DURATION_MS);
      }
    },
    [timerStartedAt, tick, success],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleSave = useCallback(
    (playerName: string, date: string) => {
      const newEntry: OrdonnerLeaderboardEntry = {
        name: playerName,
        freeScore,
        totalItems: ROUND_SIZE,
        totalTimeSeconds: elapsedSeconds,
        date,
      };
      const updated = addEntry(newEntry);
      setLeaderboard(updated);
    },
    [freeScore, elapsedSeconds, addEntry],
  );

  const handleReplay = useCallback(() => {
    correctCountRef.current = 0;
    setItems(initGame());
    setTimerStartedAt(null);
    setLiveSeconds(0);
    setGameOver(false);
    setElapsedSeconds(0);
    setWrongId(null);
    setActiveId(null);
    setLeaderboard(getEntries());
  }, [getEntries]);

  const activeItem = activeId
    ? items.find((i) => i.id === activeId)
    : undefined;

  // ── Écran d'accueil ────────────────────────────────────────────────────────
  if (timerStartedAt === null) {
    return (
      <div className="flex flex-col items-center gap-6 p-8 pt-12">
        <div className="text-center flex flex-col gap-3">
          <div className="text-5xl">🧩</div>
          <h2
            className="text-3xl font-bold"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              color: "#7e57c2",
            }}
          >
            Ordonner la frise
          </h2>
          <p className="text-slate-400 text-sm font-semibold max-w-xs mx-auto leading-relaxed">
            Glisse chaque événement vers son emplacement sur la frise
            chronologique
          </p>
        </div>

        <span
          className="text-sm font-bold px-4 py-1.5 rounded-full"
          style={{
            background: "#f0ebff",
            color: "#7e57c2",
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          {ROUND_SIZE} événements à placer
        </span>

        <button
          type="button"
          onClick={handleStart}
          className="px-10 py-4 rounded-3xl text-xl font-bold text-white active:scale-95 transition-transform"
          style={{
            background: "linear-gradient(135deg, #9575cd, #7e57c2)",
            boxShadow: "0 4px 20px #9575cd40",
            fontFamily: "'Fredoka', system-ui, sans-serif",
          }}
        >
          GO ! 🚀
        </button>

        {/* Leaderboard sur l'écran d'accueil */}
        {leaderboard.length > 0 && (
          <div
            className="w-full max-w-xs rounded-3xl p-4 border-2 flex flex-col gap-3"
            style={{
              background: "white",
              borderColor: "#e9d5ff",
              boxShadow: "0 4px 20px #c084fc15",
            }}
          >
            <h3
              className="text-center text-base font-bold"
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                color: "#7e57c2",
              }}
            >
              🏆 Meilleurs scores
            </h3>
            <div className="flex flex-col gap-1">
              {leaderboard.slice(0, 5).map((entry, index) => {
                const rank = MEDALS[index] ?? `${index + 1}.`;
                const retry = entry.totalItems - entry.freeScore;
                return (
                  <div
                    key={`${entry.name}-${entry.date}`}
                    className="flex items-center gap-2 rounded-2xl px-3 py-1.5 text-sm"
                    style={{
                      background: "#fafafa",
                      fontFamily: "'Nunito', system-ui, sans-serif",
                    }}
                  >
                    <span className="w-6 text-center shrink-0">{rank}</span>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <span
                        className="font-bold truncate"
                        style={{ color: "#4a148c" }}
                      >
                        {entry.name}
                      </span>
                      <span className="text-xs" style={{ color: "#b0bec5" }}>
                        {formatAge(entry.date)}
                      </span>
                    </div>
                    <span
                      className="font-bold shrink-0 text-xs"
                      style={{ color: "#7e57c2" }}
                    >
                      {entry.freeScore}★
                      {retry > 0 && (
                        <span style={{ color: "#ef4444" }}> · {retry}❌</span>
                      )}
                    </span>
                    <span
                      className="text-xs shrink-0"
                      style={{ color: "#b0bec5" }}
                    >
                      {formatTime(entry.totalTimeSeconds)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Partie en cours ────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>

      <div className="flex flex-col gap-4 p-4">
        <div className="text-center pt-3 pb-1">
          <div className="flex items-center justify-center gap-2 mb-1">
            <ArrowUpDown size={18} style={{ color: "#9575cd" }} />
            <h2
              className="text-2xl"
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontWeight: 600,
                color: "#4a148c",
              }}
            >
              Ordonner la frise
            </h2>
            <ArrowUpDown size={18} style={{ color: "#9575cd" }} />
          </div>
          <p className="text-slate-400 text-sm font-semibold">
            Glisse les cartes vers leur emplacement 🧩
          </p>
        </div>

        {/* Progression + chrono */}
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
            <div className="flex items-center gap-3">
              {/* Chrono live */}
              <div className="flex items-center gap-1">
                <Clock size={14} style={{ color: "#9575cd" }} />
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{
                    fontFamily: "'Fredoka', system-ui, sans-serif",
                    color: "#9575cd",
                  }}
                >
                  {formatTime(liveSeconds)}
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
                  {correctCount}
                </span>
                <span className="text-sm font-semibold text-slate-400">
                  / {ROUND_SIZE}
                </span>
              </div>
            </div>
          </div>
          <ProgressBar current={correctCount} total={ROUND_SIZE} />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="flex gap-3">
            <div
              className="flex-1 rounded-3xl border-2 p-3"
              style={{
                background: "white",
                borderColor: "#e9d5ff",
                boxShadow: "0 4px 20px #c084fc15",
                overflowX: "auto",
              }}
            >
              <GameTimeline items={items} />
            </div>

            <div
              className="w-36 shrink-0 flex flex-col gap-2"
              style={{ position: "sticky", top: 80, alignSelf: "flex-start" }}
            >
              <p
                className="text-xs font-bold text-center pt-1"
                style={{
                  color: "#9575cd",
                  fontFamily: "'Fredoka', system-ui, sans-serif",
                }}
              >
                À placer
              </p>
              {pendingItems.map((item) => (
                <DraggableEventCard
                  key={item.id}
                  item={item}
                  isWrong={wrongId === item.id}
                />
              ))}
              {pendingItems.length === 0 && (
                <p
                  className="text-center text-xs font-bold p-2"
                  style={{ color: "#16a34a" }}
                >
                  ✅ Tous placés !
                </p>
              )}
            </div>
          </div>

          <DragOverlay>
            {activeItem ? (
              <div
                style={{
                  background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
                  border: "2px solid #9575cd",
                  borderRadius: "1rem",
                  padding: "0.5rem 0.625rem",
                  boxShadow: "0 8px 24px #9575cd50",
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#4a148c",
                  lineHeight: 1.35,
                  maxWidth: 144,
                  cursor: "grabbing",
                  userSelect: "none",
                }}
              >
                {activeItem.event}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {gameOver && (
        <OrdonnerGameOverModal
          freeScore={freeScore}
          totalItems={ROUND_SIZE}
          totalTimeSeconds={elapsedSeconds}
          leaderboard={leaderboard}
          onSave={handleSave}
          onReplay={handleReplay}
        />
      )}
    </>
  );
};

export default FriseOrdonnnerTab;
