'use client';

import React from 'react';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation/Navigation';
import { MainLayoutProvider, useMainLayout } from '@/lib/layout-context';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <MainLayoutProvider>
      <App>{children}</App>
    </MainLayoutProvider>
  );
}

function App({ children }: Props) {
  const { headerVisible, navigationVisible } = useMainLayout();

  return (
    <div className="flex h-full flex-col overflow-auto">
      {headerVisible && (
        <Header showLogoText showSearchIcon showAlarmIcon showCashIcon />
      )}
      <main
        className={
          `flex-1 overflow-auto ` +
          (headerVisible ? 'pt-56' : '') +
          (navigationVisible ? 'pb-56' : '')
        }
      >
        {children}
      </main>
      {navigationVisible && <Navigation className="fixed bottom-0 w-full" />}
    </div>
  );
}
