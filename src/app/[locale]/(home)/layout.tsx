import React from 'react';

import HomeHeader from '@/components/HomeHeader';
import Navigation from '@/components/Navigation/Navigation';

type HomeLayoutProps = { children?: React.ReactNode };

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <HomeHeader className="mx-auto w-[360rem]" />
      <div className="my-56">{children}</div>
      <Navigation className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-[360rem] bg-gray-100" />
    </>
  );
};

export default HomeLayout;
