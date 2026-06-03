import ProgressBar from "../../shared/ProgressBar";

interface QuizProgressProps {
  answered: number;
  total: number;
}

const QuizProgress = ({ answered, total }: QuizProgressProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span
          className="text-sm font-bold"
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif",
            color: "#6a1b9a",
          }}
        >
          Progression
        </span>
        <span className="text-sm font-bold" style={{ color: "#9575cd" }}>
          {answered} / {total}
        </span>
      </div>
      <ProgressBar current={answered} total={total} />
    </div>
  );
};

export default QuizProgress;
