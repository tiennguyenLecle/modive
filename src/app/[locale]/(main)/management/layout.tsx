'use client';

import React from 'react';

import { Navigation } from '@/components';

type CommonLayoutProps = { children?: React.ReactNode };

const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <div className="my-56 h-full bg-gray-90">{children}</div>
      <Navigation className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-[360rem] bg-gray-100" />
    </>
  );
};

export default CommonLayout;
