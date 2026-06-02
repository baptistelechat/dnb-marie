interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-violet-100 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${current} pays sur ${total} identifiés`}
      />
    </div>
  );
};

export default ProgressBar;
