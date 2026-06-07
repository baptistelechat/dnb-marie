import { useState, useCallback } from "react";
import { Link2, RotateCcw } from "lucide-react";
import { EU_COUNTRIES } from "../../data/euCountries";
import { useHaptics } from "../../utils/hapticPatterns";
import type {
  AssociationBoardState,
  AssociationLeaderboardEntry,
} from "./types";
import { initBoard, updateBoardAfterMatch } from "./utils";
import { useAssociationLeaderboard } from "./hooks/useAssociationLeaderboard";
import AssociationBoard from "./components/AssociationBoard";
import AssociationGameOverModal from "./components/AssociationGameOverModal";
import Timer from "../MapQuizTab/components/Timer";
import LeaderboardPanel from "../MapQuizTab/components/LeaderboardPanel";

const TOTAL = EU_COUNTRIES.length;

const AssociationTab = () => {
  const { tick, success, error: hapticError } = useHaptics();
  const { getEntries, addEntry } = useAssociationLeaderboard();

  const [board, setBoard] = useState<AssociationBoardState>(() => initBoard());
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [fadingOut, setFadingOut] = useState<Set<string>>(new Set());
  const [shakingPair, setShakingPair] = useState<{
    left: string;
    right: string;
  } | null>(null);
  const [failedCodes, setFailedCodes] = useState<Set<string>>(new Set());
  const [firstTryCodes, setFirstTryCodes] = useState<Set<string>>(new Set());
  const [solvedCount, setSolvedCount] = useState(0);
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [timerStoppedAt, setTimerStoppedAt] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<AssociationLeaderboardEntry[]>(
    () => getEntries(),
  );

  const handleGo = useCallback(() => {
    setTimerStartedAt(Date.now());
  }, []);

  const evaluate = useCallback(
    (leftCode: string, rightCode: string) => {
      if (leftCode === rightCode) {
        tick();
        if (!failedCodes.has(leftCode)) {
          setFirstTryCodes((prev) => new Set([...prev, leftCode]));
        }
        const newSolvedCount = solvedCount + 1;
        setSolvedCount(newSolvedCount);
        setFadingOut((prev) => new Set([...prev, leftCode]));
        setSelectedLeft(null);
        setSelectedRight(null);
        setTimeout(() => {
          setFadingOut((prev) => {
            const n = new Set(prev);
            n.delete(leftCode);
            return n;
          });
          setBoard((prev) => updateBoardAfterMatch(prev, leftCode));
          if (newSolvedCount === TOTAL) {
            setTimerStoppedAt(Date.now());
            setShowGameOver(true);
            success();
          }
        }, 350);
      } else {
        hapticError();
        setFailedCodes((prev) => new Set([...prev, leftCode]));
        setShakingPair({ left: leftCode, right: rightCode });
        setTimeout(() => {
          setShakingPair(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 500);
      }
    },
    [tick, hapticError, success, failedCodes, solvedCount],
  );

  const handleSelectLeft = useCallback(
    (code: string) => {
      if (fadingOut.has(code) || shakingPair !== null) return;
      if (selectedLeft === code) {
        setSelectedLeft(null);
        return;
      }
      setSelectedLeft(code);
      if (selectedRight !== null && !fadingOut.has(selectedRight)) {
        evaluate(code, selectedRight);
      }
    },
    [selectedLeft, selectedRight, fadingOut, shakingPair, evaluate],
  );

  const handleSelectRight = useCallback(
    (code: string) => {
      if (fadingOut.has(code) || shakingPair !== null) return;
      if (selectedRight === code) {
        setSelectedRight(null);
        return;
      }
      setSelectedRight(code);
      if (selectedLeft !== null && !fadingOut.has(selectedLeft)) {
        evaluate(selectedLeft, code);
      }
    },
    [selectedLeft, selectedRight, fadingOut, shakingPair, evaluate],
  );

  const handleSave = useCallback(
    (playerName: string, date: string) => {
      const start = timerStartedAt ?? 0;
      const stop = timerStoppedAt ?? Date.now();
      const entry: AssociationLeaderboardEntry = {
        name: playerName,
        firstTryScore: firstTryCodes.size,
        totalCountries: TOTAL,
        totalTimeSeconds: Math.floor((stop - start) / 1000),
        date,
      };
      const updated = addEntry(entry);
      setLeaderboard(updated);
    },
    [timerStartedAt, timerStoppedAt, firstTryCodes.size, addEntry],
  );

  const handleReplay = useCallback(() => {
    setBoard(initBoard());
    setSelectedLeft(null);
    setSelectedRight(null);
    setFadingOut(new Set());
    setShakingPair(null);
    setFailedCodes(new Set());
    setFirstTryCodes(new Set());
    setSolvedCount(0);
    setTimerStartedAt(null);
    setTimerStoppedAt(null);
    setShowGameOver(false);
  }, []);

  const leaderboardForPanel = leaderboard.map(
    ({ name, firstTryScore, totalCountries, totalTimeSeconds, date }) => ({
      name,
      firstTryScore,
      totalCountries,
      totalTimeSeconds,
      date,
    }),
  );

  const totalTimeSeconds =
    timerStartedAt !== null && timerStoppedAt !== null
      ? Math.floor((timerStoppedAt - timerStartedAt) / 1000)
      : 0;

  return (
    <div className="flex flex-col gap-4 py-4 px-4 max-w-2xl mx-auto">
      <div className="text-center pt-3 pb-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Link2 size={18} style={{ color: "#9575cd" }} />
          <h2
            className="text-2xl text-slate-800"
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Association
          </h2>
          <Link2 size={18} style={{ color: "#9575cd" }} />
        </div>
        <p className="text-slate-400 text-sm font-semibold">
          Relie chaque pays à sa capitale 🗺️
        </p>
      </div>

      {timerStartedAt !== null && (
        <Timer startedAt={timerStartedAt} stoppedAt={timerStoppedAt} />
      )}

      <div
        className="flex items-center justify-between px-1 text-sm font-semibold"
        style={{
          color: "#9575cd",
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
      >
        <span>
          {solvedCount} / {TOTAL} paires trouvées
        </span>
        <span style={{ color: "#b39ddb" }}>{board.pool.length} en réserve</span>
      </div>

      {timerStartedAt === null ? (
        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 border-purple-200 bg-purple-50">
          <p
            className="text-slate-500 text-sm font-semibold"
            style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
          >
            🔗 27 paires pays ↔ capitale
          </p>
          <button
            type="button"
            onClick={handleGo}
            className="px-10 py-4 rounded-2xl font-bold text-2xl text-white shadow-lg active:scale-95 transition-transform"
            style={{
              background: "#7e57c2",
              fontFamily: "'Fredoka', system-ui, sans-serif",
            }}
            aria-label="Démarrer la partie"
          >
            GO !
          </button>
          <p
            className="text-slate-400 text-xs"
            style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
          >
            Le chrono démarre au GO
          </p>
        </div>
      ) : (
        <AssociationBoard
          display={board.display}
          leftOrder={board.leftOrder}
          rightOrder={board.rightOrder}
          selectedLeft={selectedLeft}
          selectedRight={selectedRight}
          fadingOut={fadingOut}
          shakingPair={shakingPair}
          onSelectLeft={handleSelectLeft}
          onSelectRight={handleSelectRight}
        />
      )}

      <LeaderboardPanel entries={leaderboardForPanel} />

      {solvedCount > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleReplay}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50 active:scale-95"
            aria-label="Recommencer depuis le début"
          >
            <RotateCcw size={14} />
            Recommencer
          </button>
        </div>
      )}

      {showGameOver && (
        <AssociationGameOverModal
          firstTryScore={firstTryCodes.size}
          totalCountries={TOTAL}
          totalTimeSeconds={totalTimeSeconds}
          leaderboard={leaderboard}
          onSave={handleSave}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
};

export default AssociationTab;
