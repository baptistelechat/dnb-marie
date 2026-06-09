import { useState, useMemo } from "react";
import { Lightbulb } from "lucide-react";

interface HintButtonProps {
  pool: string[];
  answer: string;
  onHintUsed: () => void;
  onChoiceSelected?: (choice: string) => void;
}

const shuffleArray = <T,>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = result[i]!;
    result[i] = result[j]!;
    result[j] = tmp;
  }
  return result;
};

const HintButton = ({
  pool,
  answer,
  onHintUsed,
  onChoiceSelected,
}: HintButtonProps) => {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const choices = useMemo(() => {
    const distractors = shuffleArray(
      pool.filter((item) => item !== answer),
    ).slice(0, 3);
    return shuffleArray([...distractors, answer]);
  }, [pool, answer]);

  const handleReveal = () => {
    setRevealed(true);
    onHintUsed();
  };

  const handleChoiceClick = (choice: string) => {
    setSelected(choice);
    onChoiceSelected?.(choice);
  };

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={handleReveal}
        className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-semibold transition-opacity active:scale-95"
        style={{
          background: "#f5f0fb",
          color: "#9575cd",
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
        aria-label="Afficher une proposition"
      >
        <Lightbulb size={14} />
        Proposition
      </button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {choices.map((choice) => {
        const isSelected = selected === choice;
        const isAnswer = choice === answer;
        const showCorrect = isSelected && isAnswer;
        const showWrong = isSelected && !isAnswer;

        return (
          <button
            key={choice}
            type="button"
            onClick={() => handleChoiceClick(choice)}
            className="px-4 py-2 rounded-2xl text-sm font-semibold transition-all active:scale-95"
            style={{
              background: showCorrect
                ? "#dcfce7"
                : showWrong
                  ? "#fee2e2"
                  : "#f5f0fb",
              color: showCorrect
                ? "#16a34a"
                : showWrong
                  ? "#dc2626"
                  : "#7e57c2",
              border: isSelected
                ? "2px solid currentColor"
                : "2px solid transparent",
              fontFamily: "'Nunito', system-ui, sans-serif",
            }}
          >
            {choice}
          </button>
        );
      })}
    </div>
  );
};

export default HintButton;
