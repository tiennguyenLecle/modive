import { ComponentProps } from 'react';

import { cx } from '@/utils/method';

type ProgressBarProps = ComponentProps<'div'> & {
  percentage: number;
  className?: string;
};

export default function ProgressBar({
  percentage,
  className,
  ...rest
}: ProgressBarProps) {
  return (
    <div
      className={cx(
        'relative flex h-24 w-full items-center overflow-hidden rounded-16 bg-gray-80 p-3',
        className
      )}
      {...rest}
    >
      <div
        className="flex h-full items-center justify-center rounded-16 font-semibold text-white transition-all duration-500"
        style={{
          width: `${percentage}%`,
          background: 'linear-gradient(90deg, #FF627B, #FFB559)',
        }}
      >
        {percentage > 10 && (
          <p className="text-12 font-semibold text-white">{percentage}%</p>
        )}
      </div>
      {percentage <= 10 && (
        <p className="ml-4 text-12 font-semibold text-black">{percentage}%</p>
      )}
    </div>
  );
}
