type ProgressBarProps = {
  percentage: number;
  className?: string;
};

export default function ProgressBar({
  percentage,
  className,
}: ProgressBarProps) {
  return (
    <div
      className={`relative flex h-24 w-full items-center overflow-hidden rounded-16 bg-gray-100 p-3 ${className} `}
    >
      <div
        className="text-white flex h-full items-center justify-center rounded-16 font-semibold transition-all duration-500"
        style={{
          width: `${percentage}%`,
          background: 'linear-gradient(90deg, #FF627B, #FFB559)',
        }}
      >
        {percentage > 10 && (
          <p className="text-white text-12 font-[600]">{percentage}%</p>
        )}
      </div>
      {percentage <= 10 && (
        <p className="ml-4 text-12 font-[600] text-black">{percentage}%</p>
      )}
    </div>
  );
}
