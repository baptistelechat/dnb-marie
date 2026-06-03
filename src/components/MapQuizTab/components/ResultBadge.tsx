import type { LastResult } from "../types";

interface ResultBadgeProps {
  result: LastResult;
  correctName: string;
  correctCapital: string;
}

const ResultBadge = ({
  result,
  correctName,
  correctCapital,
}: ResultBadgeProps) => {
  if (!result) return null;

  const isCorrect = result === "correct";
  const isSkipped = result === "skipped";

  const bg = isCorrect ? "#e8f5e9" : isSkipped ? "#fff8e1" : "#fce4ec";
  const border = isCorrect ? "#a5d6a7" : isSkipped ? "#ffe082" : "#f48fb1";
  const titleColor = isCorrect ? "#2e7d32" : isSkipped ? "#e65100" : "#c62828";
  const bodyColor = isCorrect ? undefined : isSkipped ? "#bf360c" : "#880e4f";
  const title = isCorrect
    ? "✅ Bravo !"
    : isSkipped
      ? "⏭ Passé !"
      : "❌ Pas tout à fait…";

  return (
    <div
      className="rounded-2xl px-4 py-3 text-center"
      style={{ background: bg, border: `2px solid ${border}` }}
      role="status"
      aria-live="polite"
    >
      <p
        className="font-bold text-base"
        style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          color: titleColor,
        }}
      >
        {title}
      </p>
      {!isCorrect && (
        <p
          className="text-sm mt-1"
          style={{
            color: bodyColor,
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          {correctName} · {correctCapital}
        </p>
      )}
    </div>
  );
};

export default ResultBadge;
