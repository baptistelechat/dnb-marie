import type { AssociationPair } from "../types";
import ColumnItem from "./ColumnItem";
import type { ColumnItemState } from "./ColumnItem";

interface AssociationBoardProps {
  display: AssociationPair[];
  leftOrder: string[];
  rightOrder: string[];
  selectedLeft: string | null;
  selectedRight: string | null;
  fadingOut: Set<string>;
  shakingPair: { left: string; right: string } | null;
  onSelectLeft: (code: string) => void;
  onSelectRight: (code: string) => void;
  leftLabel?: string;
  rightLabel?: string;
}

const AssociationBoard = ({
  display,
  leftOrder,
  rightOrder,
  selectedLeft,
  selectedRight,
  fadingOut,
  shakingPair,
  onSelectLeft,
  onSelectRight,
  leftLabel = "Pays",
  rightLabel = "Capitales",
}: AssociationBoardProps) => {
  const pairMap = new Map(display.map((p) => [p.countryCode, p]));

  const getLeftState = (code: string): ColumnItemState => {
    if (fadingOut.has(code)) return "fading";
    if (shakingPair?.left === code) return "shaking";
    if (selectedLeft === code) return "selected";
    return "idle";
  };

  const getRightState = (code: string): ColumnItemState => {
    if (fadingOut.has(code)) return "fading";
    if (shakingPair?.right === code) return "shaking";
    if (selectedRight === code) return "selected";
    return "idle";
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-2">
        <p
          className="text-xs font-bold text-center uppercase tracking-wide"
          style={{
            color: "#b39ddb",
            fontFamily: "'Fredoka', system-ui, sans-serif",
          }}
        >
          {leftLabel}
        </p>
        {leftOrder.map((code) => {
          const pair = pairMap.get(code);
          if (!pair) return null;
          return (
            <ColumnItem
              key={code}
              label={pair.country}
              itemState={getLeftState(code)}
              onClick={() => onSelectLeft(code)}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <p
          className="text-xs font-bold text-center uppercase tracking-wide"
          style={{
            color: "#b39ddb",
            fontFamily: "'Fredoka', system-ui, sans-serif",
          }}
        >
          {rightLabel}
        </p>
        {rightOrder.map((code) => {
          const pair = pairMap.get(code);
          if (!pair) return null;
          return (
            <ColumnItem
              key={code}
              label={pair.capital}
              itemState={getRightState(code)}
              onClick={() => onSelectRight(code)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AssociationBoard;
