import { ComponentProps } from 'react';

export type ProgressBarProps = ComponentProps<'div'> & {
  label?: string;
  labelColor?: string;
  backgroundColor?: string;
  fillColor?: string | { from: string; to: string };
  innerDisplayThreshold?: number;
  size?: number | { width?: number; height?: number } | 'small' | 'default';
  status?: 'success' | 'exception' | 'active' | 'normal';
  value: number;
  max?: number;
  gradientFollowsProgress?: boolean;
  valueColorInside?: string;
  valueColorOutside?: string;
};
