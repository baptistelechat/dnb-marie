import { useDroppable } from "@dnd-kit/core";
import type { GameItem } from "../types";

const POINT_R = 7;
const RANGE_W = 24;
// Zone de hit invisible agrandie pour les points (tap confortable sur mobile)
const HIT_R = 22;

interface DropZoneProps {
  item: GameItem;
  x: number;
  y: number;
  height?: number;
  color: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const DropZone = ({
  item,
  x,
  y,
  height = 20,
  color,
  onHoverStart,
  onHoverEnd,
}: DropZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: item.id,
    disabled: item.state === "correct",
  });
  const isCorrect = item.state === "correct";

  if (item.type === "point") {
    return (
      // Zone de hit élargie — transparente, centrée sur le point visuel
      <div
        ref={setNodeRef}
        style={{
          position: "absolute",
          left: x - HIT_R,
          top: y - HIT_R,
          width: HIT_R * 2,
          height: HIT_R * 2,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
        aria-label={isCorrect ? item.event : `Emplacement pour ${item.date}`}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        {/* Cercle visuel */}
        <div
          style={{
            width: POINT_R * 2,
            height: POINT_R * 2,
            borderRadius: "50%",
            border: isCorrect
              ? "2px solid #86efac"
              : `2px dashed ${isOver ? "#9575cd" : "#c4b5fd"}`,
            background: isCorrect
              ? "linear-gradient(135deg, #86efac, #4ade80)"
              : isOver
                ? "#f3e8ff"
                : "white",
            boxShadow: isCorrect
              ? "0 0 10px #86efac80"
              : isOver
                ? "0 0 0 3px #ddd6fe"
                : "none",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: RANGE_W,
        height,
        borderRadius: 10,
        border: isCorrect
          ? `2px solid ${color}`
          : `2px dashed ${isOver ? "#9575cd" : "#c4b5fd"}`,
        background: isCorrect
          ? `${color}cc`
          : isOver
            ? "#f3e8ff"
            : `${color}22`,
        boxShadow: isCorrect
          ? `0 2px 10px ${color}80`
          : isOver
            ? "0 0 0 3px #ddd6fe"
            : "none",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
      aria-label={isCorrect ? item.event : `Emplacement pour ${item.date}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <span
        style={{
          fontSize: 8,
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 700,
          color: isCorrect ? "#4a148c" : "#9575cd",
          writingMode: "vertical-rl",
          pointerEvents: "none",
          userSelect: "none",
          overflow: "hidden",
          maxHeight: height - 4,
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {isCorrect ? `${item.date} - ${item.event}` : item.date}
      </span>
    </div>
  );
};

export default DropZone;
