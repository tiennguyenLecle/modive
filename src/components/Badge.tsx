import React, { ComponentProps } from 'react';

import { cx } from '@/utils/method';

type BadgeProps = ComponentProps<'span'> & {
  count?: number;
  showZero?: boolean;
  dot?: boolean;
  overflowCount?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Badge = ({
  count,
  showZero = false,
  dot = false,
  overflowCount = 99,
  children,
  style,
  className = '',
  ...rest
}: BadgeProps) => {
  const isZero = count === 0;
  const isHidden = (!showZero && isZero) || count === undefined;

  let displayCount: string | number | undefined = count;
  if (typeof count === 'number' && count > overflowCount) {
    displayCount = `${overflowCount}+`;
  }

  return (
    <span
      className={cx('badge-wrapper relative inline-block', className)}
      style={{ ...style }}
      {...rest}
    >
      {children}
      {(dot || !isHidden) && (
        <sup
          className={cx(
            'badge absolute right-0 top-0 rounded-max bg-primary',
            'flex items-center justify-center',
            'text-12 font-semibold text-gray-100',
            dot && 'badge-dot'
          )}
          style={{
            width: dot ? 8 : 16,
            height: dot ? 8 : 16,
            padding: dot ? 0 : '6px',
            color: '#fff',
            transform: 'translate(25%, -25%)',
            zIndex: 1,
          }}
        >
          {!dot && displayCount}
        </sup>
      )}
    </span>
  );
};

export default Badge;
