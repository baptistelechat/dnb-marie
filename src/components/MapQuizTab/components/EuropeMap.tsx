import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { EU_COUNTRIES } from "../../../data/euCountries";
import { NUMERIC_TO_ALPHA2, CANDY_COLORS, WORLD_ATLAS_URL } from "../constants";

const COUNTRY_COLOR_INDEX: Record<string, number> = {};
EU_COUNTRIES.forEach((country, i) => {
  COUNTRY_COLOR_INDEX[country.code] = i % CANDY_COLORS.length;
});

interface EuropeMapProps {
  activeCode: string | null;
  answeredCodes: Set<string>;
  pulsingCode: string | null;
  onSelect: (alpha2: string) => void;
}

const EuropeMap = ({
  activeCode,
  answeredCodes,
  pulsingCode,
  onSelect,
}: EuropeMapProps) => {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{ background: "#e8f4fd" }}
    >
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{ rotate: [-10.0, -52.0, 0], scale: 720 }}
        width={800}
        height={520}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={WORLD_ATLAS_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const alpha2 = NUMERIC_TO_ALPHA2[geo.id as string];
              if (!alpha2) return null;

              const colorIdx = COUNTRY_COLOR_INDEX[alpha2] ?? 0;
              const candy = CANDY_COLORS[colorIdx];
              const isActive = alpha2 === activeCode;
              const isAnswered = answeredCodes.has(alpha2);
              const isPulsing = alpha2 === pulsingCode;

              let fill = candy.fill;
              let stroke = candy.stroke;
              let strokeWidth = 1;
              let opacity = 1;

              if (isAnswered) {
                fill = "#bbf7d0";
                stroke = "#4ade80";
                strokeWidth = 1.5;
                opacity = 0.85;
              } else if (isActive) {
                fill = candy.vivid;
                stroke = candy.stroke;
                strokeWidth = 2;
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onSelect(alpha2)}
                  style={{
                    default: {
                      fill,
                      stroke,
                      strokeWidth,
                      opacity,
                      outline: "none",
                    },
                    hover: {
                      fill: isAnswered ? "#86efac" : candy.vivid,
                      stroke: candy.stroke,
                      strokeWidth: 2,
                      opacity: isAnswered ? 0.85 : 1,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: candy.vivid,
                      stroke: candy.stroke,
                      strokeWidth: 2,
                      outline: "none",
                    },
                  }}
                  {...(isPulsing
                    ? {
                        style: {
                          default: {
                            fill: candy.vivid,
                            stroke: candy.stroke,
                            strokeWidth: 2,
                            outline: "none",
                            animation: "map-pulse 1.2s ease-in-out infinite",
                          },
                          hover: {
                            fill: candy.vivid,
                            stroke: candy.stroke,
                            strokeWidth: 2,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: candy.vivid,
                            stroke: candy.stroke,
                            strokeWidth: 2,
                            outline: "none",
                          },
                        },
                      }
                    : {})}
                  aria-label={alpha2}
                  role="button"
                  tabIndex={0}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default EuropeMap;
