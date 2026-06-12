interface ClueCardProps {
  clues: string[];
  revealedCount: number;
}

const ClueCard = ({ clues, revealedCount }: ClueCardProps) => {
  const remaining = clues.length - revealedCount;

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-4"
      style={{ background: "#f5f0fb", border: "2px solid #ede7f6" }}
    >
      <h3
        className="text-sm font-bold flex items-center gap-2"
        style={{
          color: "#9575cd",
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontSize: "15px",
        }}
      >
        🔍 Qui suis-je ?
      </h3>

      {clues.slice(0, revealedCount).map((clue, i) => (
        <div key={i} className="flex gap-3 items-start">
          <span
            className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0 mt-0.5"
            style={{ background: "#ede7f6", color: "#7e57c2" }}
          >
            {i + 1}
          </span>
          <p
            className="text-sm leading-relaxed"
            style={{
              color: "#4a148c",
              fontFamily: "'Nunito', system-ui, sans-serif",
            }}
          >
            {clue}
          </p>
        </div>
      ))}

      {remaining > 0 && (
        <p
          className="text-xs text-center"
          style={{
            color: "#b0bec5",
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          {remaining} indice{remaining > 1 ? "s" : ""} restant
          {remaining > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default ClueCard;
