'use client';

import { useViewTransitionDirection } from '@/lib/view-transitions';

interface ViewTransitionProviderProps {
  children: React.ReactNode;
}

export function ViewTransitionProvider({
  children,
}: ViewTransitionProviderProps) {
  // This hook will automatically track navigation and add direction classes
  useViewTransitionDirection();

  return <>{children}</>;
}
