import React, { ComponentProps } from 'react';

import AlarmIcon from '@/assets/icons/alarm.svg';
import CashIcon from '@/assets/icons/cash.svg';
import LogoText from '@/assets/icons/logo-text.svg';
import SearchIcon from '@/assets/icons/search.svg';
import Badge from '@/components/Badge';
import { cx } from '@/utils/method';

type HomeHeaderProps = ComponentProps<'header'> & {
  className?: string;
};

const HomeHeader = ({ className }: HomeHeaderProps) => {
  return (
    <header
      className={cx(
        'fixed left-0 right-0 top-0 z-50 flex min-h-56 items-center justify-between bg-white px-16',
        className
      )}
    >
      <LogoText width={82} height={24} />
      <div className="flex items-center gap-12">
        <SearchIcon width={24} height={24} />
        <Badge count={3} showZero>
          <AlarmIcon width={24} height={24} />
        </Badge>
        <CashIcon width={24} height={24} />
      </div>
    </header>
  );
};

export default HomeHeader;
