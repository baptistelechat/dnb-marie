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

  return (
    <div
      className="rounded-2xl px-4 py-3 text-center"
      style={{
        background: isCorrect ? "#e8f5e9" : "#fce4ec",
        border: `2px solid ${isCorrect ? "#a5d6a7" : "#f48fb1"}`,
      }}
      role="status"
      aria-live="polite"
    >
      <p
        className="font-bold text-base"
        style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          color: isCorrect ? "#2e7d32" : "#c62828",
        }}
      >
        {isCorrect ? "✅ Bravo !" : "❌ Pas tout à fait…"}
      </p>
      {!isCorrect && (
        <p
          className="text-sm mt-1"
          style={{
            color: "#880e4f",
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
