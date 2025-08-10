'use client';

import React, { ComponentProps } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Alarm, ArrowRight, Cash, LogoText, Search } from '@/assets/icons';
import { Badge } from '@/components';
import { ROUTES } from '@/utils/constants';
import { cx } from '@/utils/method';

type HomeHeaderProps = ComponentProps<'header'> & {
  className?: string;
  pageTitle?: string;
  showSearchIcon?: boolean;
  showAlarmIcon?: boolean;
  showCashIcon?: boolean;
  showLogoText?: boolean;
  showBackButton?: boolean;
};

const Header = ({
  className,
  pageTitle,
  showSearchIcon,
  showAlarmIcon,
  showCashIcon,
  showLogoText,
  showBackButton,
  ...rest
}: HomeHeaderProps) => {
  const router = useRouter();

  return (
    <header
      className={cx(
        'fixed left-0 right-0 top-0 z-50 flex min-h-56 items-center justify-center bg-white px-16',
        className
      )}
      {...rest}
    >
      <div className="absolute left-16 flex items-center gap-12">
        {showBackButton && (
          <ArrowRight
            width={24}
            height={24}
            className="rotate-180 text-gray-00"
            onClick={() => router.back()}
          />
        )}
        {showLogoText && (
          <Link href={ROUTES.HOME}>
            <LogoText width={82} height={24} />
          </Link>
        )}
      </div>

      {pageTitle && (
        <h2 className="text-16 font-semibold text-gray-00">{pageTitle}</h2>
      )}

      <div className="absolute right-16 flex items-center gap-12">
        {showSearchIcon && (
          <Link href="#">
            <Search width={24} height={24} />
          </Link>
        )}
        {showAlarmIcon && (
          <Link href="#">
            <Badge.Wrapper count={3} showZero>
              <Alarm width={24} height={24} className="text-gray-00" />
            </Badge.Wrapper>
          </Link>
        )}
        {showCashIcon && (
          <Link href="#">
            <Cash width={24} height={24} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
