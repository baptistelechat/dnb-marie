import { useState, useRef, useEffect } from "react";
import type { Country } from "../../../data/euCountries";
import type { LastResult, QuizMode } from "../types";
import { answersMatch } from "../../../utils/normalizeAnswer";
import FlagHint from "./FlagHint";
import ResultBadge from "./ResultBadge";

interface QuizPanelProps {
  country: Country | null;
  mode: QuizMode;
  lastResult: LastResult;
  showFlag: boolean;
  onToggleFlag: () => void;
  onSubmit: (name: string, capital: string) => void;
  onNext: () => void;
  onSkip?: () => void;
}

const QuizPanel = ({
  country,
  mode,
  lastResult,
  showFlag,
  onToggleFlag,
  onSubmit,
  onNext,
  onSkip,
}: QuizPanelProps) => {
  const [nameInput, setNameInput] = useState("");
  const [capitalInput, setCapitalInput] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (country && lastResult === null) {
      nameInputRef.current?.focus();
    }
  }, [country, lastResult]);

  useEffect(() => {
    if (lastResult !== null) {
      nextButtonRef.current?.focus();
    }
  }, [lastResult]);

  if (!country) {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: "rgba(255,255,255,0.7)",
          border: "2px dashed #d8b4fe",
        }}
      >
        <p
          className="text-base font-bold"
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif",
            color: "#9575cd",
          }}
        >
          {mode === "directed"
            ? "🎯 Regarde le pays qui clignote !"
            : "🗺️ Clique sur un pays pour commencer"}
        </p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !capitalInput.trim()) return;
    onSubmit(nameInput, capitalInput);
  };

  const nameCorrect = answersMatch(nameInput, country.name);
  const capitalCorrect = answersMatch(capitalInput, country.capital);
  const bothCorrect = nameCorrect && capitalCorrect;

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-4"
      style={{
        background: "rgba(255,255,255,0.85)",
        border: "2px solid #e0d4f5",
      }}
    >
      <p
        className="text-sm font-bold text-center"
        style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          color: "#6a1b9a",
          fontSize: "16px",
        }}
      >
        {mode === "directed" ? "📍 Quel pays est-ce ?" : "🌍 Identifie ce pays"}
      </p>

      <FlagHint
        countryCode={country.code}
        visible={showFlag}
        onToggle={onToggleFlag}
      />

      {lastResult === null ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="country-name-input"
              className="text-xs font-bold"
              style={{ color: "#7c3aed" }}
            >
              Nom du pays
            </label>
            <input
              ref={nameInputRef}
              id="country-name-input"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="ex : Espagne"
              autoComplete="off"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold outline-none transition-all"
              style={{
                background: "#f5f0fb",
                border: "2px solid #d8b4fe",
                color: "#4c1d95",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="capital-input"
              className="text-xs font-bold"
              style={{ color: "#7c3aed" }}
            >
              Capitale
            </label>
            <input
              id="capital-input"
              type="text"
              value={capitalInput}
              onChange={(e) => setCapitalInput(e.target.value)}
              placeholder="ex : Madrid"
              autoComplete="off"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold outline-none transition-all"
              style={{
                background: "#f5f0fb",
                border: "2px solid #d8b4fe",
                color: "#4c1d95",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!nameInput.trim() || !capitalInput.trim()}
            className="w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:
                bothCorrect && nameInput && capitalInput
                  ? "linear-gradient(135deg, #a5d6a7, #43a047)"
                  : "linear-gradient(135deg, #ede7f6, #e3f2fd)",
              color:
                bothCorrect && nameInput && capitalInput ? "white" : "#6a1b9a",
              border: "2px solid #9575cd",
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "15px",
            }}
          >
            Vérifier ✔
          </button>
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="w-full py-1.5 text-xs font-semibold transition-colors rounded-xl hover:text-slate-500"
              style={{
                color: "#b0bec5",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            >
              Passer →
            </button>
          )}
        </form>
      ) : (
        <div className="flex flex-col gap-3">
          <ResultBadge
            result={lastResult}
            correctName={country.name}
            correctCapital={country.capital}
          />
          <button
            ref={nextButtonRef}
            type="button"
            onClick={onNext}
            className="w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
              color: "#6a1b9a",
              border: "2px solid #9575cd",
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "15px",
            }}
          >
            {mode === "directed" ? "Pays suivant →" : "Fermer"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPanel;
