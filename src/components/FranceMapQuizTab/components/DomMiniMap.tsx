import type { ReactNode } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { FRANCE_REGIONS_ALL_URL } from "../constants";

interface DomConfig {
  center: [number, number];
  scale: number;
  width: number;
  height: number;
}

const DOM_PROJECTION_CONFIG: Record<string, DomConfig> = {
  "01": { center: [-61.406, 16.173], scale: 4700, width: 80, height: 70 }, // Guadeloupe
  "02": { center: [-61.019, 14.634], scale: 6600, width: 58, height: 70 }, // Martinique
  "03": { center: [-53.11, 3.93], scale: 950, width: 57, height: 70 }, // Guyane
  "04": { center: [55.527, -21.131], scale: 6000, width: 78, height: 70 }, // La Réunion
  "06": { center: [45.159, -12.821], scale: 8500, width: 53, height: 70 }, // Mayotte
};

interface DomMiniMapProps {
  code: string;
  name: string;
  isActive: boolean;
  isAnswered: boolean;
  isPulsing: boolean;
  isInteractive: boolean;
  onSelect: () => void;
}

const DomMiniMap = ({
  code,
  name,
  isActive,
  isAnswered,
  isPulsing,
  isInteractive,
  onSelect,
}: DomMiniMapProps) => {
  const config = DOM_PROJECTION_CONFIG[code];
  if (!config) return null;

  let fill = "#c8c8c8";
  let stroke = "#a0a0a0";
  let strokeWidth = 1;

  if (isAnswered) {
    fill = "#7e57c2";
    stroke = "#4a148c";
    strokeWidth = 1.5;
  } else if (isActive) {
    fill = "#ddd6fe";
    stroke = "#7c3aed";
    strokeWidth = 2;
  }

  const hoverFill = isAnswered ? "#6a1b9a" : isActive ? "#c4b5fd" : "#a0a0a0";
  const hoverStroke = isAnswered ? "#4a148c" : "#7c3aed";
  const borderColor = isAnswered ? "#7e57c2" : isActive ? "#7c3aed" : "#e2e8f0";

  return (
    <div
      className="rounded-xl overflow-hidden border-2 transition-all duration-200 active:scale-95"
      style={{
        width: config.width,
        background: "#f0f0f0",
        borderColor,
        cursor: isInteractive ? "pointer" : "default",
        animation: isPulsing ? "map-pulse 1.2s ease-in-out infinite" : "none",
      }}
      onClick={isInteractive ? onSelect : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onSelect();
            }
          : undefined
      }
      role="button"
      aria-label={`${name}${isAnswered ? " — trouvé" : ""}`}
      aria-pressed={isAnswered}
      tabIndex={0}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: config.center, scale: config.scale }}
        width={config.width}
        height={config.height}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <Geographies geography={FRANCE_REGIONS_ALL_URL}>
          {({ geographies }) => {
            const nodes: ReactNode[] = [];
            for (const geo of geographies) {
              if (geo.properties.code !== code) continue;
              nodes.push(
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill, stroke, strokeWidth, outline: "none" },
                    hover: {
                      fill: isInteractive ? hoverFill : fill,
                      stroke: isInteractive ? hoverStroke : stroke,
                      strokeWidth: isInteractive ? 2 : strokeWidth,
                      outline: "none",
                    },
                    pressed: {
                      fill: isAnswered ? "#5e35b1" : "#c4b5fd",
                      stroke: "#4a148c",
                      strokeWidth: 2,
                      outline: "none",
                    },
                  }}
                  tabIndex={-1}
                  aria-hidden="true"
                />,
              );
            }
            return nodes;
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default DomMiniMap;
