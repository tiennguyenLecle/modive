import { Progress } from 'antd';

import styles from './ProgressBar.module.scss';
import { ProgressBarProps } from './ProgressBar.type';

export default function ProgressBar({
  fillColor = { from: '#FF627B', to: '#FFB559' },
  backgroundColor = '#F0EFF1',
  gradientFollowsProgress = false,
  innerDisplayThreshold = 10,
  size = { height: 18 },
  status = 'active',
  value,
  max = 100,
  label,
  labelColor,
  valueColorInside,
  valueColorOutside,
}: ProgressBarProps) {
  const percentage = ((value ?? 0) / max) * 100;
  const clampedPercentage = Math.min(percentage, 90);

  return (
    <>
      <span
        className={`flex-shrink-0 whitespace-nowrap text-14 font-semibold ${
          labelColor ? `text-[${labelColor}]` : 'text-primary'
        }`}
      >
        {label}
      </span>
      <div
        className="relative flex size-full flex-col justify-center"
        style={
          typeof fillColor === 'object' &&
          ({
            '--progress-percentage': percentage,
            '--progress-gradient-from': fillColor.from,
            '--progress-gradient-to': fillColor.to,
            '--progress-unfilled-color': backgroundColor,
          } as any)
        }
      >
        <Progress
          percentPosition={
            (percentage ?? 0) > innerDisplayThreshold
              ? { align: 'center', type: 'inner' }
              : undefined
          }
          className={`flex h-[24px] flex-col items-center justify-center rounded-max bg-[#F0EFF1] p-3 ${!gradientFollowsProgress && styles.customProgress} `}
          format={percent => (
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: valueColorInside || '#fff',
              }}
            >
              {percent}%
            </span>
          )}
          showInfo={(percentage ?? 0) > innerDisplayThreshold}
          strokeColor={fillColor}
          percent={percentage}
          size={size}
          trailColor={backgroundColor}
          status={status}
        />
        {(percentage ?? 0) <= innerDisplayThreshold && (
          <span
            className={`${styles.customProgressValue} custom-progress-value`}
            style={{
              color: valueColorOutside || '#000',
              left: `calc(${clampedPercentage}% + 4.7px)`,
            }}
          >
            {percentage ?? 0}%
          </span>
        )}
      </div>
    </>
  );
}
