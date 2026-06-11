import { useDraggable } from "@dnd-kit/core";
import type { GameItem } from "../types";

interface DraggableEventCardProps {
  item: GameItem;
  isWrong: boolean;
}

const DraggableEventCard = ({ item, isWrong }: DraggableEventCardProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
  });

  if (item.state === "correct") return null;

  return (
    <div
      ref={setNodeRef}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: isDragging ? "grabbing" : "grab",
        animation: isWrong ? "shake 0.5s ease-in-out" : undefined,
        touchAction: "none",
        userSelect: "none",
        background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
        border: "2px solid #c4b5fd",
        borderRadius: "1rem",
        padding: "0.5rem 0.625rem",
        boxShadow: "0 2px 8px #9575cd20",
        fontFamily: "'Nunito', system-ui, sans-serif",
        fontSize: 11,
        fontWeight: 700,
        color: "#4a148c",
        lineHeight: 1.35,
        textAlign: "center" as const,
        transition: "opacity 0.2s",
      }}
      {...attributes}
      {...listeners}
    >
      {item.event}
    </div>
  );
};

export default DraggableEventCard;
