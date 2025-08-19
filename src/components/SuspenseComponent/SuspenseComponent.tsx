import { Suspense } from 'react';

import Loading from '@/app/[locale]/loading';

export default function SuspenseComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
