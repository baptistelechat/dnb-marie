import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  startedAt: number | null; // timestamp ms, null = pas démarré
  stoppedAt: number | null; // timestamp ms, null = en cours
}

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const Timer = ({ startedAt, stoppedAt }: TimerProps) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (stoppedAt !== null) return; // figé
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [stoppedAt]);

  if (startedAt === null) return null;

  const elapsed = Math.floor(((stoppedAt ?? now) - startedAt) / 1000);

  return (
    <div
      className="flex items-center justify-center gap-1.5"
      style={{ color: "#9575cd" }}
    >
      <Clock size={13} />
      <span
        className="font-bold text-sm tabular-nums"
        style={{ fontFamily: "'Fredoka', system-ui, sans-serif" }}
      >
        {formatTime(elapsed)}
      </span>
    </div>
  );
};

export default Timer;
