import type { ReactNode } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { NUMERIC_TO_ALPHA2, WORLD_ATLAS_URL } from "../constants";

const SMALL_EU_MARKERS: Record<string, [number, number]> = {
  BE: [4.4694, 50.5039],
  LU: [6.1296, 49.8153],
  SI: [14.9955, 46.1512],
  MT: [14.3754, 35.9375],
  CY: [33.4299, 35.1264],
};

interface EuropeMapProps {
  activeCode: string | null;
  answeredCodes: Set<string>;
  pulsingCode: string | null;
  onSelect: (alpha2: string) => void;
  isInteractive: boolean;
}

const EuropeMap = ({
  activeCode,
  answeredCodes,
  pulsingCode,
  onSelect,
  isInteractive,
}: EuropeMapProps) => {
  return (
    <div
      className="map-viewport w-full lg:h-full rounded-2xl overflow-hidden"
      style={{ background: "#f0f0f0" }}
    >
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{ rotate: [-10.0, -52.0, 0], scale: 720 }}
        width={800}
        height={520}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={WORLD_ATLAS_URL}>
          {({ geographies }) => {
            const nonEU: ReactNode[] = [];
            const eu: ReactNode[] = [];
            for (const geo of geographies) {
              const alpha2 = NUMERIC_TO_ALPHA2[geo.id as string];
              if (!alpha2) {
                nonEU.push(
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#e5e7eb",
                        stroke: "#d1d5db",
                        strokeWidth: 0.5,
                        outline: "none",
                        pointerEvents: "none",
                      },
                      hover: {
                        fill: "#e5e7eb",
                        stroke: "#d1d5db",
                        strokeWidth: 0.5,
                        outline: "none",
                        pointerEvents: "none",
                      },
                      pressed: {
                        fill: "#e5e7eb",
                        outline: "none",
                        pointerEvents: "none",
                      },
                    }}
                    tabIndex={-1}
                    aria-hidden="true"
                  />,
                );
              } else {
                const isActive = alpha2 === activeCode;
                const isAnswered = answeredCodes.has(alpha2);
                const isPulsing = alpha2 === pulsingCode;

                let fill = "#c8c8c8";
                let stroke = "#a0a0a0";
                let strokeWidth = 0.8;

                if (isAnswered) {
                  fill = "#7e57c2";
                  stroke = "#4a148c";
                  strokeWidth = 1.5;
                } else if (isActive) {
                  fill = "#ddd6fe";
                  stroke = "#7c3aed";
                  strokeWidth = 2;
                }

                const hoverFill = isAnswered
                  ? "#6a1b9a"
                  : isActive
                    ? "#c4b5fd"
                    : "#a0a0a0";
                const hoverStroke = isAnswered ? "#4a148c" : "#7c3aed";

                if (isPulsing) {
                  eu.push(
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      {...(isInteractive && {
                        onClick: () => onSelect(alpha2),
                      })}
                      style={{
                        default: {
                          fill: "#ddd6fe",
                          stroke: "#7c3aed",
                          strokeWidth: 2,
                          outline: "none",
                          animation: "map-pulse 1.2s ease-in-out infinite",
                          cursor: isInteractive ? "pointer" : "default",
                          pointerEvents: isInteractive ? "auto" : "none",
                        },
                        hover: {
                          fill: "#c4b5fd",
                          stroke: "#7c3aed",
                          strokeWidth: 2,
                          outline: "none",
                          cursor: isInteractive ? "pointer" : "default",
                          pointerEvents: isInteractive ? "auto" : "none",
                        },
                        pressed: {
                          fill: "#a78bfa",
                          stroke: "#4a148c",
                          strokeWidth: 2,
                          outline: "none",
                        },
                      }}
                      aria-label={alpha2}
                      role="img"
                      tabIndex={isInteractive ? 0 : -1}
                    />,
                  );
                } else {
                  eu.push(
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      {...(isInteractive && {
                        onClick: () => onSelect(alpha2),
                      })}
                      style={{
                        default: {
                          fill,
                          stroke,
                          strokeWidth,
                          outline: "none",
                          cursor: isInteractive ? "pointer" : "default",
                          pointerEvents: isInteractive ? "auto" : "none",
                        },
                        hover: {
                          fill: isInteractive ? hoverFill : fill,
                          stroke: isInteractive ? hoverStroke : stroke,
                          strokeWidth: isInteractive ? 2 : strokeWidth,
                          outline: "none",
                          cursor: isInteractive ? "pointer" : "default",
                          pointerEvents: isInteractive ? "auto" : "none",
                        },
                        pressed: {
                          fill: isAnswered ? "#5e35b1" : "#c4b5fd",
                          stroke: "#4a148c",
                          strokeWidth: 2,
                          outline: "none",
                        },
                      }}
                      aria-label={alpha2}
                      role={isInteractive ? "button" : "img"}
                      tabIndex={isInteractive ? 0 : -1}
                    />,
                  );
                }
              }
            }
            return (
              <>
                {/* Passe 1 : pays non-EU en fond — pas cliquables, pas interactifs */}
                {nonEU}
                {/* Passe 2 : pays EU par-dessus — cliquables si isInteractive */}
                {eu}
              </>
            );
          }}
        </Geographies>

        {/* Marqueurs cliquables pour les petits pays EU */}
        {Object.entries(SMALL_EU_MARKERS).map(([alpha2, coords]) => {
          const isActive = alpha2 === activeCode;
          const isAnswered = answeredCodes.has(alpha2);
          const isPulsing = alpha2 === pulsingCode;

          let fill = "#c8c8c8";
          let stroke = "#a0a0a0";
          if (isAnswered) {
            fill = "#7e57c2";
            stroke = "#4a148c";
          } else if (isActive) {
            fill = "#ddd6fe";
            stroke = "#7c3aed";
          }

          return (
            <Marker key={`marker-${alpha2}`} coordinates={coords}>
              <circle
                r={6}
                fill={fill}
                stroke={stroke}
                strokeWidth={1.5}
                style={{
                  cursor: isInteractive ? "pointer" : "default",
                  pointerEvents: isInteractive ? "auto" : "none",
                  animation: isPulsing
                    ? "map-pulse 1.2s ease-in-out infinite"
                    : "none",
                  outlineColor: "transparent",
                }}
                onClick={isInteractive ? () => onSelect(alpha2) : undefined}
                role={isInteractive ? "button" : "img"}
                aria-label={alpha2}
                tabIndex={isInteractive ? 0 : -1}
              />
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};

export default EuropeMap;
