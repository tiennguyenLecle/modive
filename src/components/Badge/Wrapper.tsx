import React, { ComponentProps } from 'react';

import { cx } from '@/utils/method';

import BadgeCountNode from './CountNode';

type BadgeWrapperProps = ComponentProps<'span'> & {
  count?: number;
  showZero?: boolean;
  dot?: boolean;
  overflowCount?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const BadgeWrapper = ({
  count,
  showZero = false,
  dot = false,
  overflowCount = 99,
  children,
  style,
  className = '',
  ...rest
}: BadgeWrapperProps) => {
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
      {count ? (
        <sup className="absolute right-0 top-0">
          <BadgeCountNode
            count={Number(displayCount)}
            showZero={showZero}
            dot={dot}
            overflowCount={overflowCount}
          />
        </sup>
      ) : (
        <></>
      )}
    </span>
  );
};

export default BadgeWrapper;
