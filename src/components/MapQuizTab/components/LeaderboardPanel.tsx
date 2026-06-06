import type { LeaderboardEntry } from "../types";

interface LeaderboardPanelProps {
  entries: LeaderboardEntry[];
}

const MEDALS = ["🥇", "🥈", "🥉"];

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
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

const LeaderboardPanel = ({ entries }: LeaderboardPanelProps) => {
  if (entries.length === 0) return null;

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3"
      style={{
        background: "rgba(255,255,255,0.85)",
        border: "2px solid #e0d4f5",
      }}
    >
      <h3
        className="text-center font-bold"
        style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          color: "#7e57c2",
          fontSize: "15px",
        }}
      >
        🏆 Classement
      </h3>

      <div className="flex flex-col gap-1">
        {entries.map((entry, index) => {
          const rank = MEDALS[index] ?? `${index + 1}.`;
          return (
            <div
              key={`${entry.name}-${entry.date}`}
              className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs"
              style={{
                background: "#fafafa",
                border: "2px solid #f0ebff",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            >
              <span className="w-5 text-center shrink-0 text-sm">{rank}</span>
              <div className="flex-1 min-w-0 flex flex-col">
                <span
                  className="font-bold truncate"
                  style={{ color: "#4a148c" }}
                >
                  {entry.name}
                </span>
                <span style={{ color: "#b0bec5" }}>
                  {formatAge(entry.date)}
                </span>
              </div>
              <span className="font-bold shrink-0" style={{ color: "#7e57c2" }}>
                {entry.firstTryScore}/{entry.totalCountries}
              </span>
              <span className="shrink-0" style={{ color: "#b0bec5" }}>
                {formatTime(entry.totalTimeSeconds)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardPanel;
