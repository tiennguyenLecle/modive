// context/CMSContext.tsx
'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

type SubContentBlock = { id: string; content?: string };
type ContentBlock = { id: string; title: string; subBlocks: SubContentBlock[] };

type CMSInterfaceState = {
  heroBanner: string;
  contentBlocks: ContentBlock[];
  setHeroBanner: (url: string) => void;
  updateBlock: (id: string, changes: Partial<ContentBlock>) => void;
  addContentBlock: () => void;
  deleteContentBlock: (id: string) => void;
  addSubBlock: (blockId: string) => void;
};

const CMSInterfaceContext = createContext<CMSInterfaceState | undefined>(
  undefined
);

export function CMSInterfaceProvider({ children }: { children: ReactNode }) {
  const [heroBanner, setHeroBannerState] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  const setHeroBanner = (url: string) => setHeroBannerState(url);

  const updateBlock = (id: string, changes: Partial<ContentBlock>) => {
    setContentBlocks(prev =>
      prev.map(b => (b.id === id ? { ...b, ...changes } : b))
    );
  };

  const addContentBlock = () => {
    setContentBlocks(prev => [
      ...prev,
      { id: Date.now().toString(), title: '', subBlocks: [] },
    ]);
  };

  const deleteContentBlock = (id: string) => {
    setContentBlocks(prev => prev.filter(b => b.id !== id));
  };

  const addSubBlock = (blockId: string) => {
    setContentBlocks(prev =>
      prev.map(b =>
        b.id === blockId
          ? {
              ...b,
              subBlocks: [...b.subBlocks, { id: Date.now().toString() }],
            }
          : b
      )
    );
  };

  return (
    <CMSInterfaceContext.Provider
      value={{
        heroBanner,
        contentBlocks,
        setHeroBanner,
        updateBlock,
        addContentBlock,
        deleteContentBlock,
        addSubBlock,
      }}
    >
      {children}
    </CMSInterfaceContext.Provider>
  );
}

export function useCMSInterface() {
  const ctx = useContext(CMSInterfaceContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}
