import React from 'react';

import { Navigation } from '@/components';

type HomeLayoutProps = { children?: React.ReactNode };

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <div className="mb-56">{children}</div>
      <Navigation className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-[360rem] bg-gray-100" />
    </>
  );
};

export default HomeLayout;
