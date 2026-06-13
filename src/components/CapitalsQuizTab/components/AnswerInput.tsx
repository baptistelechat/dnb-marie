import { useState, useEffect, useRef } from "react";
import type { Country } from "../../../data/euCountries";
import type { CapitalsDirection, CapitalsLastResult } from "../types";
import HintButton from "../../shared/HintButton";

interface AnswerInputProps {
  direction: CapitalsDirection;
  lastResult: CapitalsLastResult;
  country: Country | null;
  pool: string[];
  onSubmit: (answer: string, hintUsed: boolean) => void;
  onNext: () => void;
  onSkip?: () => void;
}

const AnswerInput = ({
  direction,
  lastResult,
  country,
  pool,
  onSubmit,
  onNext,
  onSkip,
}: AnswerInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [hintRevealed, setHintRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (lastResult === null) {
      inputRef.current?.focus();
    }
  }, [lastResult]);

  useEffect(() => {
    if (lastResult !== null) {
      nextButtonRef.current?.focus();
    }
  }, [lastResult]);

  const placeholder =
    direction === "country-to-capital"
      ? "Entrez la capitale..."
      : "Entrez le pays...";

  const correctAnswer =
    country === null
      ? ""
      : direction === "country-to-capital"
        ? country.capital
        : country.name;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSubmit(inputValue, hintRevealed);
  };

  const handleChoiceSelected = (choice: string) => {
    onSubmit(choice, true);
  };

  if (lastResult === null) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Entrer la capitale"
          className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold outline-none transition-all"
          style={{
            background: "#f5f0fb",
            border: "2px solid #d8b4fe",
            color: "#4c1d95",
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="flex-1 py-2.5 rounded-full font-bold text-sm transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
              border: "2px solid #9575cd",
              color: "#6a1b9a",
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "15px",
            }}
          >
            Valider
          </button>
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95"
              style={{
                background: "transparent",
                border: "2px solid #fcd34d",
                color: "#92400e",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            >
              Passer →
            </button>
          )}
          {correctAnswer && (
            <div className={hintRevealed ? "basis-full order-last" : ""}>
              <HintButton
                pool={pool}
                answer={correctAnswer}
                onHintUsed={() => setHintRevealed(true)}
                onChoiceSelected={handleChoiceSelected}
              />
            </div>
          )}
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {lastResult === "correct" && (
        <div
          className="rounded-xl px-4 py-3 text-center font-bold text-sm"
          style={{
            background: "#dcfce7",
            border: "2px solid #86efac",
            color: "#15803d",
            fontFamily: "'Fredoka', system-ui, sans-serif",
            fontSize: "16px",
          }}
        >
          ✅ Bravo !
        </div>
      )}

      {lastResult === "wrong" && (
        <div
          className="rounded-xl px-4 py-3 text-center flex flex-col gap-1"
          style={{
            background: "#fee2e2",
            border: "2px solid #fca5a5",
          }}
        >
          <p
            className="font-bold text-sm"
            style={{
              color: "#b91c1c",
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "16px",
            }}
          >
            ❌ Incorrect
          </p>
          <p
            className="text-xs"
            style={{
              color: "#991b1b",
              fontFamily: "'Nunito', system-ui, sans-serif",
            }}
          >
            La réponse était : <strong>{correctAnswer}</strong>
          </p>
        </div>
      )}

      {lastResult === "skipped" && (
        <div
          className="rounded-xl px-4 py-3 text-center flex flex-col gap-1"
          style={{
            background: "#fef9c3",
            border: "2px solid #fde047",
          }}
        >
          <p
            className="font-bold text-sm"
            style={{
              color: "#92400e",
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "16px",
            }}
          >
            ⏭️ Passé
          </p>
          <p
            className="text-xs"
            style={{
              color: "#78350f",
              fontFamily: "'Nunito', system-ui, sans-serif",
            }}
          >
            La réponse était : <strong>{correctAnswer}</strong>
          </p>
        </div>
      )}

      <button
        ref={nextButtonRef}
        type="button"
        onClick={onNext}
        className="w-full py-2.5 rounded-full font-bold text-sm transition-all duration-200 active:scale-95"
        style={{
          background: "#7e57c2",
          color: "white",
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontSize: "15px",
          border: "none",
        }}
      >
        Suivant →
      </button>
    </div>
  );
};

export default AnswerInput;
