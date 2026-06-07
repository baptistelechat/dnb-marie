import ReactCountryFlag from "react-country-flag";
import { Landmark } from "lucide-react";
import type { Country } from "../../../data/euCountries";
import type { CapitalsDirection } from "../types";

interface QuizCardProps {
  country: Country | null;
  direction: CapitalsDirection;
}

const QuizCard = ({ country, direction }: QuizCardProps) => {
  if (!country) {
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
          Sélectionne un pays
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
      {direction === "country-to-capital" ? (
        <>
          <ReactCountryFlag
            countryCode={country.code}
            svg
            style={{ width: "80px", height: "auto" }}
            aria-label={`Drapeau ${country.name}`}
          />
          <p
            style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "28px",
              color: "#4a3f6b",
              margin: 0,
            }}
          >
            {country.name}
          </p>
          <p
            className="text-sm font-semibold"
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              color: "#9575cd",
            }}
          >
            Quelle est la capitale ?
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
            }}
          >
            {country.capital}
          </p>
          <p
            className="text-sm"
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              color: "#9575cd",
            }}
          >
            De quel pays est-ce la capitale ?
          </p>
        </>
      )}
    </div>
  );
};

export default QuizCard;
