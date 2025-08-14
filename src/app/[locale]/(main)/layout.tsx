import React from 'react';
import { Provider } from 'jotai';
import { headers } from 'next/headers';

import { Navigation } from '@/components';
import { AuthProvider } from '@/lib/authentication/auth-context';
import { cx } from '@/utils/method';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const deviceClassName = (() => {
    const h = headers();
    const chMobile = h.get('sec-ch-ua-mobile');
    if (chMobile) {
      return chMobile === '?1' ? 'device-mobile' : 'device-desktop';
    }
    const ua = h.get('user-agent') || '';
    const isTablet = /Tablet|iPad/i.test(ua);
    const isMobile =
      /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    if (isMobile) return 'device-mobile';
    if (isTablet) return 'device-tablet';
    return 'device-desktop';
  })();

  return (
    <AuthProvider role="user">
      <div className={cx('main-layout', deviceClassName)}>
        <div className="page-wrapper">
          <Provider>{children}</Provider>
        </div>
        <div className="navigation-wrapper">
          <Navigation />
        </div>
      </div>
    </AuthProvider>
  );
}
