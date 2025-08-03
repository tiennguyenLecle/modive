import React, { ComponentProps } from 'react';

import AlarmIcon from '@/assets/icons/alarm.svg';
import CashIcon from '@/assets/icons/cash.svg';
import Badge from '@/components/Badge';
import { cx } from '@/utils/method';

type CommonHeaderProps = ComponentProps<'header'> & {
  className?: string;
  pageTitle?: string;
};

const CommonHeader = ({ className, pageTitle, ...rest }: CommonHeaderProps) => {
  return (
    <header
      className={cx(
        'fixed left-0 right-0 top-0 z-50 flex min-h-56 items-center justify-center bg-white px-16',
        className
      )}
      {...rest}
    >
      <h2 className="text-16 font-semibold text-gray-00">{pageTitle}</h2>
      <div className="absolute right-16 flex items-center gap-12">
        <Badge count={3} showZero>
          <AlarmIcon width={24} height={24} />
        </Badge>
        <CashIcon width={24} height={24} />
      </div>
    </header>
  );
};

export default CommonHeader;
