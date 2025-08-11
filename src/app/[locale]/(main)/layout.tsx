import React from 'react';

import { Navigation } from '@/components';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="main-layout">
      <div className="page-wrapper">{children}</div>
      <div className="navigation-wrapper">
        <Navigation />
      </div>
    </div>
  );
}
