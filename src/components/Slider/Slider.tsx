'use client';

import React, { useEffect, useRef, useState } from 'react';

import { cx } from '@/utils/method';

import styles from './Slider.module.scss';

interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  marks?: Record<number, React.ReactNode>;
  tooltip?: (value: number) => React.ReactNode;
}

const SliderComponent: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue = 1,
  min = 1,
  max = 16,
  step = 1,
  onChange,
  disabled = false,
  className = '',
  marks,
  tooltip,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const rangeRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const currentValue = controlledValue ?? uncontrolledValue;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div
      className={cx('relative h-48 pb-4 pt-12', styles.slider, className)}
      style={{ ['--percentage' as any]: `${percentage}%` }}
    >
      {tooltip && (
        <div
          className="pointer-events-none absolute top-0 flex h-20 flex-col items-center whitespace-nowrap"
          style={{
            left: `${percentage}%`,
            transform: `translateX(-${percentage}%)`,
          }}
        >
          <span className="-tracking-0.048 mb-1 text-center font-pretendard text-12 font-semibold leading-1.66 text-primary">
            {tooltip(currentValue)}
          </span>
        </div>
      )}
      <div className="px-8">
        <input
          ref={rangeRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          aria-label={`Slider from ${min} to ${max}`}
        />
      </div>
      <div className="flex w-full justify-between gap-4 text-center font-pretendard text-12 font-normal leading-1.66 tracking-0.4 text-gray-50">
        <span>{marks?.[min]}</span>
        <span>{marks?.[max]}</span>
      </div>
    </div>
  );
};

export default SliderComponent;
