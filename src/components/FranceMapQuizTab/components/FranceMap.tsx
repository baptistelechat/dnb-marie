import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { FRANCE_REGIONS_URL, DOM_CODES } from "../constants";

interface FranceMapProps {
  activeCode: string | null;
  answeredCodes: Set<string>;
  pulsingCode: string | null;
  onSelect: (code: string) => void;
  isInteractive: boolean;
}

const FranceMap = ({
  activeCode,
  answeredCodes,
  pulsingCode,
  onSelect,
  isInteractive,
}: FranceMapProps) => {
  return (
    <div
      className="map-viewport w-full lg:h-full rounded-2xl overflow-hidden"
      style={{ background: "#f0f0f0" }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [0.44, 46.5], scale: 2400 }}
        width={1000}
        height={700}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={FRANCE_REGIONS_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo) => !DOM_CODES.has(geo.properties.code as string))
              .map((geo) => {
                const code = geo.properties.code as string;
                const isActive = code === activeCode;
                const isAnswered = answeredCodes.has(code);
                const isPulsing = code === pulsingCode;

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

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    {...(isInteractive && { onClick: () => onSelect(code) })}
                    style={{
                      default: {
                        fill,
                        stroke,
                        strokeWidth,
                        outline: "none",
                        cursor: isInteractive ? "pointer" : "default",
                        pointerEvents: isInteractive ? "auto" : "none",
                        animation: isPulsing
                          ? "map-pulse 1.2s ease-in-out infinite"
                          : "none",
                      },
                      hover: {
                        fill: isInteractive ? hoverFill : fill,
                        stroke: isInteractive ? hoverStroke : stroke,
                        strokeWidth: isInteractive ? 2 : strokeWidth,
                        outline: "none",
                        cursor: isInteractive ? "pointer" : "default",
                      },
                      pressed: {
                        fill: isAnswered ? "#5e35b1" : "#c4b5fd",
                        stroke: "#4a148c",
                        strokeWidth: 2,
                        outline: "none",
                      },
                    }}
                    aria-label={geo.properties.nom as string}
                    role={isInteractive ? "button" : "img"}
                    tabIndex={isInteractive ? 0 : -1}
                  />
                );
              })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default FranceMap;
