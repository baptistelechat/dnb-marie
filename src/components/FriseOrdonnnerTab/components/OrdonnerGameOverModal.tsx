import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { OrdonnerLeaderboardEntry } from "../types";

interface OrdonnerGameOverModalProps {
  freeScore: number;
  totalItems: number;
  totalTimeSeconds: number;
  leaderboard: OrdonnerLeaderboardEntry[];
  onSave: (playerName: string, date: string) => void;
  onReplay: () => void;
}

const MEDALS = ["🥇", "🥈", "🥉"];

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

const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m} min ${s} sec` : `${m} min`;
};

const OrdonnerGameOverModal = ({
  freeScore,
  totalItems,
  totalTimeSeconds,
  leaderboard,
  onSave,
  onReplay,
}: OrdonnerGameOverModalProps) => {
  const retryScore = totalItems - freeScore;
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedEntryDate, setSavedEntryDate] = useState<string | null>(null);

  const handleSave = () => {
    if (!name.trim()) return;
    const date = new Date().toISOString();
    setSavedEntryDate(date);
    onSave(name.trim(), date);
    setSaved(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ordonner-gameover-title"
    >
      <div
        className="rounded-3xl p-6 max-w-md w-full mx-4 flex flex-col gap-4"
        style={{
          background: "white",
          boxShadow: "0 8px 40px rgba(126,87,194,0.25)",
        }}
      >
        <div className="text-center flex flex-col gap-2">
          <div className="text-4xl">🎉</div>
          <h2
            id="ordonner-gameover-title"
            className="text-2xl font-bold"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              color: "#7e57c2",
            }}
          >
            Bravo !
          </h2>
          <p
            className="text-2xl font-bold"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              color: "#4a148c",
            }}
          >
            {freeScore} ★{retryScore > 0 ? ` · ${retryScore} ❌` : ""}
          </p>
          <span
            className="self-center text-sm px-3 py-1 rounded-full font-semibold"
            style={{
              background: "#f0ebff",
              color: "#7e57c2",
              fontFamily: "'Nunito', system-ui, sans-serif",
            }}
          >
            ⏱ {formatTime(totalTimeSeconds)}
          </span>
        </div>

        {!saved && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ordonner-player-name"
              className="text-sm font-bold"
              style={{
                color: "#7e57c2",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            >
              Ton prénom
            </label>
            <input
              id="ordonner-player-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
              placeholder="Ex: Marie"
              className="w-full rounded-2xl px-4 py-2 text-sm outline-none"
              style={{
                background: "#f5f0fb",
                border: "2px solid #d8b4fe",
                fontFamily: "'Nunito', system-ui, sans-serif",
                color: "#4a148c",
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={handleSave}
              disabled={!name.trim()}
              className="w-full rounded-2xl py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #9575cd, #7e57c2)",
                fontFamily: "'Fredoka', system-ui, sans-serif",
              }}
            >
              Sauvegarder 🎯
            </button>
          </div>
        )}

        {saved && leaderboard.length > 0 && (
          <div className="flex flex-col gap-2">
            <p
              className="text-center text-sm font-semibold"
              style={{
                color: "#9575cd",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            >
              ✅ Score sauvegardé !
            </p>
            <h3
              className="text-center text-lg font-bold"
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                color: "#7e57c2",
              }}
            >
              🏆 Classement
            </h3>
            <div className="flex flex-col gap-1 max-h-52 overflow-y-auto">
              {leaderboard.slice(0, 10).map((entry, index) => {
                const isNew =
                  savedEntryDate !== null && entry.date === savedEntryDate;
                const rank = MEDALS[index] ?? `${index + 1}.`;
                const entryRetry = entry.totalItems - entry.freeScore;
                return (
                  <div
                    key={`${entry.name}-${entry.date}`}
                    className="flex items-center gap-2 rounded-2xl px-3 py-1.5 text-sm"
                    style={{
                      background: isNew ? "#f0ebff" : "#fafafa",
                      border: isNew
                        ? "2px solid #ddd6fe"
                        : "2px solid transparent",
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
                      {entryRetry > 0 && (
                        <span style={{ color: "#ef4444" }}>
                          {" "}
                          · {entryRetry}❌
                        </span>
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

        <button
          type="button"
          onClick={onReplay}
          className="flex items-center justify-center gap-2 w-full rounded-2xl py-2.5 text-sm font-bold transition-colors"
          style={{
            background: "#f5f0fb",
            color: "#7e57c2",
            fontFamily: "'Fredoka', system-ui, sans-serif",
          }}
          aria-label="Rejouer une nouvelle partie"
        >
          <RotateCcw size={15} />
          Rejouer
        </button>
      </div>
    </div>
  );
};

export default OrdonnerGameOverModal;
