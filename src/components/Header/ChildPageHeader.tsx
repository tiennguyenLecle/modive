'use client';

import React, { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';

import ArrowRight from '@/assets/icons/arrow-right.svg';
import { cx } from '@/utils/method';

type ChildPageHeaderProps = ComponentProps<'header'> & {
  className?: string;
  pageTitle?: string;
};

const ChildPageHeader = ({
  className,
  pageTitle,
  ...rest
}: ChildPageHeaderProps) => {
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
        <ArrowRight
          width={24}
          height={24}
          className="rotate-180 text-gray-00"
          onClick={() => router.back()}
        />
      </div>
      <h2 className="text-16 font-semibold text-gray-00">{pageTitle}</h2>
    </header>
  );
};

export default ChildPageHeader;
