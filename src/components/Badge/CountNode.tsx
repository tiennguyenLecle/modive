import React, { ComponentProps } from 'react';

import { cx } from '@/utils/method';

type BadgeCountNodeProps = ComponentProps<'div'> & {
  count?: number;
  showZero?: boolean;
  dot?: boolean;
  overflowCount?: number;
};

const BadgeCountNode = ({
  count,
  showZero = false,
  dot = false,
  overflowCount = 99,
  ...rest
}: BadgeCountNodeProps) => {
  const isZero = count === 0;
  const isHidden = (!showZero && isZero) || count === undefined;

  let displayCount: string | number | undefined = count;
  if (typeof count === 'number' && count > overflowCount) {
    displayCount = `${overflowCount}+`;
  }
  if (isHidden) return null;

  // Determine if the badge should be pill-shaped (for 2+ digits)
  const isPill = !dot && String(displayCount).length > 1;

  return (
    <div
      className={cx(
        'bg-primary',
        'inline-flex items-center justify-center',
        'text-12 font-semibold text-gray-100',
        isPill && 'px-4'
      )}
      style={{
        minWidth: dot ? 8 : 16,
        height: dot ? 8 : 16,
        padding: dot ? 0 : undefined,
        color: '#fff',
        zIndex: 1,
        borderRadius: isPill ? 9999 : '50%',
      }}
      {...rest}
    >
      {!dot && displayCount}
    </div>
  );
};

export default BadgeCountNode;
