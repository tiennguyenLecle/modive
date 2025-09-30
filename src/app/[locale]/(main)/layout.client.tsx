'use client';

import useMyCart from '@/hooks/useMyCart';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useMyCart();
  return children;
}
