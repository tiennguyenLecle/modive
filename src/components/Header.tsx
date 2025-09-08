'use client';

import React, { ComponentProps, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { Alarm, ArrowRight, Cash, LogoText, Search } from '@/assets/icons';
import { Badge } from '@/components';
import { Link } from '@/lib/navigation';
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
  onClickBackButton?: () => void;
};

const Header = ({
  className,
  pageTitle,
  showSearchIcon,
  showAlarmIcon,
  showCashIcon,
  showLogoText,
  showBackButton,
  onClickBackButton,
  ...rest
}: HomeHeaderProps) => {
  const router = useRouter();

  const titlePaddingX = useMemo(() => {
    const paddingRight =
      [showSearchIcon, showAlarmIcon, showCashIcon].filter(Boolean).length * 32;

    const paddingLeft = showLogoText ? 80 : 0 + (showBackButton ? 24 : 0);

    if (paddingLeft === 0) {
      return [paddingRight, paddingRight];
    }
    if (paddingRight === 0) {
      return [paddingLeft, paddingLeft];
    }

    return [paddingRight, paddingLeft];
  }, [
    showSearchIcon,
    showAlarmIcon,
    showCashIcon,
    showLogoText,
    showBackButton,
  ]);

  return (
    <header
      className={cx(
        'relative flex min-h-56 w-full items-center justify-center bg-white px-16',
        className
      )}
      {...rest}
    >
      <div className="absolute left-16 flex cursor-pointer items-center gap-12">
        {showBackButton && (
          <ArrowRight
            className="size-24 rotate-180 cursor-pointer text-gray-00 transition-colors hover:bg-gray-90"
            onClick={() => {
              if (onClickBackButton) {
                onClickBackButton();
              } else {
                router.back();
              }
            }}
          />
        )}
        {showLogoText && (
          <Link href={ROUTES.HOME}>
            <LogoText className="h-24 w-80" />
          </Link>
        )}
      </div>

      {pageTitle && (
        <h2
          className="line-clamp-1 min-w-0 flex-1 text-center text-16 font-semibold text-gray-00"
          title={pageTitle}
          style={{
            paddingLeft: titlePaddingX[0],
            paddingRight: titlePaddingX[1],
          }}
        >
          {pageTitle}
        </h2>
      )}

      {(showSearchIcon || showAlarmIcon || showCashIcon) && (
        <div className="absolute right-16 flex items-center gap-12">
          {showSearchIcon && (
            <Link href="#">
              <Search width={24} height={24} />
            </Link>
          )}
          {showAlarmIcon && (
            <Link href="#" className="h-24">
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
      )}
    </header>
  );
};

export default Header;
