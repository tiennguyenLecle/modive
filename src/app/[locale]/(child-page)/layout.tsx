'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { Header } from '@/components/Header';
import Navigation from '@/components/Navigation/Navigation';
import { getTranslationKeyFromPathname } from '@/utils/method';

type ChildPageLayoutProps = {
  children?: React.ReactNode;
};

const ChildPageLayout = ({ children }: ChildPageLayoutProps) => {
  const t = useTranslations('page_title');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <>
      <Header.ChildPage
        className="mx-auto w-[360rem]"
        pageTitle={t(getTranslationKeyFromPathname(pathname, locale))}
      />
      <div className="my-56 h-full bg-gray-90">{children}</div>
      <Navigation className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-[360rem] bg-gray-100" />
    </>
  );
};

export default ChildPageLayout;
