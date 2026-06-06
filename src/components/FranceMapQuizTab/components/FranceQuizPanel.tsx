import { useState, useRef, useEffect } from "react";
import type { Region } from "../../../data/frenchRegions";
import type { LastResult, QuizMode } from "../types";
import { answersMatch } from "../../../utils/normalizeAnswer";
import ResultBadge from "../../MapQuizTab/components/ResultBadge";

interface FranceQuizPanelProps {
  region: Region | null;
  mode: QuizMode;
  lastResult: LastResult;
  onSubmit: (name: string, capital: string) => void;
  onNext: () => void;
  onSkip?: () => void;
}

const FranceQuizPanel = ({
  region,
  mode,
  lastResult,
  onSubmit,
  onNext,
  onSkip,
}: FranceQuizPanelProps) => {
  const [nameInput, setNameInput] = useState("");
  const [capitalInput, setCapitalInput] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (region && lastResult === null) {
      nameInputRef.current?.focus();
    }
  }, [region, lastResult]);

  useEffect(() => {
    if (lastResult !== null) {
      nextButtonRef.current?.focus();
    }
  }, [lastResult]);

  if (!region) {
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
            ? "🎯 Regarde la région qui clignote !"
            : "🗺️ Clique sur une région pour commencer"}
        </p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !capitalInput.trim()) return;
    onSubmit(nameInput, capitalInput);
  };

  const nameCorrect = answersMatch(nameInput, region.name);
  const capitalCorrect = answersMatch(capitalInput, region.capital);
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
        {mode === "directed"
          ? "📍 Quelle région est-ce ?"
          : "🗺️ Identifie cette région"}
      </p>

      {lastResult === null ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="region-name-input"
              className="text-xs font-bold"
              style={{ color: "#7c3aed" }}
            >
              Nom de la région
            </label>
            <input
              ref={nameInputRef}
              id="region-name-input"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="ex : Bretagne"
              autoComplete="off"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold outline-none"
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
              htmlFor="capital-france-input"
              className="text-xs font-bold"
              style={{ color: "#7c3aed" }}
            >
              Chef-lieu
            </label>
            <input
              id="capital-france-input"
              type="text"
              value={capitalInput}
              onChange={(e) => setCapitalInput(e.target.value)}
              placeholder="ex : Rennes"
              autoComplete="off"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold outline-none"
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
            correctName={region.name}
            correctCapital={region.capital}
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
            {mode === "directed" ? "Région suivante →" : "Fermer"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FranceQuizPanel;
