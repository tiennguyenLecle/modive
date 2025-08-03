import React from 'react';

import { Header } from '@/components/Header';
import Navigation from '@/components/Navigation/Navigation';

type HomeLayoutProps = { children?: React.ReactNode };

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <Header.Home className="mx-auto w-360" />
      <div className="my-56">{children}</div>
      <Navigation className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-360 bg-gray-100" />
    </>
  );
};

export default HomeLayout;
