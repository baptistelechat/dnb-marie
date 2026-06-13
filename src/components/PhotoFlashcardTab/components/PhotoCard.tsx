import { useState } from "react";
import type { PhotoEntry } from "../types";

interface PhotoCardProps {
  entry: PhotoEntry | null;
}

const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

const PhotoCard = ({ entry }: PhotoCardProps) => {
  const [imgError, setImgError] = useState(false);

  if (!entry) return null;

  return (
    <div
      className="rounded-3xl overflow-hidden flex items-center justify-center w-full"
      style={{
        background: "#f5f0fb",
        border: "2px solid #e0d4f5",
        boxShadow: "0 4px 20px rgba(126,87,194,0.1)",
        height: "300px",
      }}
    >
      {imgError ? (
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: "80px",
            height: "80px",
            background: "#f0ebff",
            border: "3px solid #9575cd",
          }}
          aria-label={`Photo de ${entry.figureName} indisponible`}
        >
          <span
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "2rem",
              color: "#7e57c2",
              fontWeight: 700,
            }}
          >
            {getInitials(entry.figureName)}
          </span>
        </div>
      ) : (
        <img
          src={entry.photoUrl}
          alt={`Portrait d'un personnage historique`}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
};

export default PhotoCard;
