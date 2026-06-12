import type { AssociationPair } from "../types";
import ColumnItem from "./ColumnItem";
import type { ColumnItemState } from "./ColumnItem";

const labelStyle = {
  color: "#b39ddb",
  fontFamily: "'Fredoka', system-ui, sans-serif",
};

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
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-3">
        <p
          className="text-xs font-bold text-center uppercase tracking-wide"
          style={labelStyle}
        >
          {leftLabel}
        </p>
        <p
          className="text-xs font-bold text-center uppercase tracking-wide"
          style={labelStyle}
        >
          {rightLabel}
        </p>
      </div>

      {leftOrder.map((leftCode, i) => {
        const rightCode = rightOrder[i]!;
        const leftPair = pairMap.get(leftCode);
        const rightPair = pairMap.get(rightCode);
        if (!leftPair || !rightPair) return null;
        return (
          <div key={leftCode} className="grid grid-cols-2 gap-3 items-stretch">
            <ColumnItem
              label={leftPair.country}
              itemState={getLeftState(leftCode)}
              onClick={() => onSelectLeft(leftCode)}
              className="h-full"
            />
            <ColumnItem
              label={rightPair.capital}
              itemState={getRightState(rightCode)}
              onClick={() => onSelectRight(rightCode)}
              className="h-full"
            />
          </div>
        );
      })}
    </div>
  );
};

export default AssociationBoard;
