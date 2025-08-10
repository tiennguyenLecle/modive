'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type MainLayoutContextValue = {
  headerVisible: boolean;
  navigationVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
  setNavigationVisible: (visible: boolean) => void;
  showHeader: () => void;
  hideHeader: () => void;
  showNavigation: () => void;
  hideNavigation: () => void;
};

const MainLayoutContext = createContext<MainLayoutContextValue | undefined>(
  undefined
);

type MainLayoutProviderProps = {
  children: React.ReactNode;
  defaultHeaderVisible?: boolean;
  defaultNavigationVisible?: boolean;
};

export function MainLayoutProvider({
  children,
  defaultHeaderVisible = true,
  defaultNavigationVisible = true,
}: MainLayoutProviderProps) {
  const [headerVisible, setHeaderVisible] =
    useState<boolean>(defaultHeaderVisible);
  const [navigationVisible, setNavigationVisible] = useState<boolean>(
    defaultNavigationVisible
  );

  const value = useMemo<MainLayoutContextValue>(
    () => ({
      headerVisible,
      navigationVisible,
      setHeaderVisible,
      setNavigationVisible,
      showHeader: () => setHeaderVisible(true),
      hideHeader: () => setHeaderVisible(false),
      showNavigation: () => setNavigationVisible(true),
      hideNavigation: () => setNavigationVisible(false),
    }),
    [headerVisible, navigationVisible]
  );

  return (
    <MainLayoutContext.Provider value={value}>
      {children}
    </MainLayoutContext.Provider>
  );
}

export function useMainLayout() {
  const ctx = useContext(MainLayoutContext);
  if (!ctx) {
    throw new Error('useMainLayout must be used within a MainLayoutProvider');
  }
  return ctx;
}
