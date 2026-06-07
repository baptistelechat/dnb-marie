import { Landmark, MapPin } from "lucide-react";
import type { Region } from "../../../data/frenchRegions";
import type { FranceCapitalsDirection } from "../types";

interface RegionQuizCardProps {
  region: Region | null;
  direction: FranceCapitalsDirection;
}

const RegionQuizCard = ({ region, direction }: RegionQuizCardProps) => {
  if (!region) {
    return (
      <div
        className="rounded-3xl p-8 flex flex-col items-center justify-center gap-4 min-h-[200px]"
        style={{
          background: "white",
          border: "2px solid #e9d5ff",
          boxShadow: "0 4px 20px #c084fc15",
        }}
      >
        <p
          className="text-base font-semibold"
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            color: "#9575cd",
          }}
        >
          Sélectionne une région
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-8 flex flex-col items-center gap-4 min-h-[200px]"
      style={{
        background: "white",
        border: "2px solid #e9d5ff",
        boxShadow: "0 4px 20px #c084fc15",
      }}
    >
      {direction === "region-to-capital" ? (
        <>
          <MapPin size={48} color="#9575cd" aria-hidden="true" />
          <p
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "28px",
              color: "#4a3f6b",
              margin: 0,
              textAlign: "center",
            }}
          >
            {region.name}
          </p>
          <p
            className="text-sm font-semibold"
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              color: "#9575cd",
            }}
          >
            Quel est le chef-lieu ?
          </p>
        </>
      ) : (
        <>
          <Landmark size={48} color="#9575cd" aria-hidden="true" />
          <p
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "28px",
              color: "#4a3f6b",
              margin: 0,
              textAlign: "center",
            }}
          >
            {region.capital}
          </p>
          <p
            className="text-sm"
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              color: "#9575cd",
            }}
          >
            De quelle région est-ce le chef-lieu ?
          </p>
        </>
      )}
    </div>
  );
};

export default RegionQuizCard;
