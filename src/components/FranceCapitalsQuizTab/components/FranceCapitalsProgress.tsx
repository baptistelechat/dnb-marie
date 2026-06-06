import ProgressBar from "../../shared/ProgressBar";

interface FranceCapitalsProgressProps {
  answered: number;
  total: number;
}

const FranceCapitalsProgress = ({
  answered,
  total,
}: FranceCapitalsProgressProps) => {
  return (
    <div
      className="rounded-2xl p-3 border-2 flex flex-col gap-2"
      style={{ background: "white", borderColor: "#e9d5ff" }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold"
          style={{
            color: "#9575cd",
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          Progression
        </span>
        <span
          className="text-xs font-bold"
          style={{
            color: "#7c3aed",
            fontFamily: "'Fredoka', system-ui, sans-serif",
          }}
        >
          {answered} / {total} régions
        </span>
      </div>
      <ProgressBar current={answered} total={total} />
    </div>
  );
};

export default FranceCapitalsProgress;
