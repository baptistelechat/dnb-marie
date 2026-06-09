import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { FranceLeaderboardEntry } from "../types";

interface GameOverModalProps {
  firstTryScore: number;
  hintScore?: number;
  total: number;
  totalTimeSeconds: number;
  leaderboard: FranceLeaderboardEntry[];
  onSave: (name: string, date: string) => void;
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
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const GameOverModal = ({
  firstTryScore,
  hintScore = 0,
  total,
  totalTimeSeconds,
  leaderboard,
  onSave,
  onReplay,
}: GameOverModalProps) => {
  const missedScore = total - firstTryScore - hintScore;
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
      aria-labelledby="france-gameover-title"
    >
      <div
        className="rounded-3xl p-6 max-w-sm w-full mx-4 flex flex-col gap-4"
        style={{
          background: "white",
          boxShadow: "0 8px 40px rgba(126,87,194,0.25)",
        }}
      >
        <div className="text-center flex flex-col gap-2">
          <div className="text-4xl">🏆</div>
          <h2
            id="france-gameover-title"
            className="text-2xl font-bold"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              color: "#7e57c2",
            }}
          >
            Partie terminée !
          </h2>
          <p
            className="text-2xl font-bold"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              color: "#4a148c",
            }}
          >
            {firstTryScore} ★{hintScore > 0 ? ` · ${hintScore} 💡` : ""} ·{" "}
            {missedScore} ❌
          </p>
          <p
            className="text-sm"
            style={{
              color: "#b0bec5",
              fontFamily: "'Nunito', system-ui, sans-serif",
            }}
          >
            ⏱ {formatTime(totalTimeSeconds)}
          </p>
        </div>

        {!saved && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="france-player-name"
              className="text-sm font-bold"
              style={{
                color: "#7e57c2",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            >
              Ton prénom
            </label>
            <input
              id="france-player-name"
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

        {saved && (
          <div className="flex flex-col gap-2">
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
              {leaderboard.map((entry, index) => {
                const isNew =
                  savedEntryDate !== null && entry.date === savedEntryDate;
                const rank = MEDALS[index] ?? `${index + 1}.`;
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
                      className="font-bold shrink-0"
                      style={{ color: "#7e57c2" }}
                    >
                      {entry.firstTryScore}★
                      {(entry.hintScore ?? 0) > 0 && (
                        <span style={{ color: "#9575cd" }}>
                          {" "}
                          · {entry.hintScore}💡
                        </span>
                      )}{" "}
                      ·{" "}
                      <span style={{ color: "#ef4444" }}>
                        {entry.totalRegions -
                          entry.firstTryScore -
                          (entry.hintScore ?? 0)}
                        ❌
                      </span>
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
          className="flex items-center justify-center gap-2 w-full rounded-2xl py-2.5 text-sm font-bold"
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

export default GameOverModal;
