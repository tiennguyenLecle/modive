// context/CMSContext.tsx
'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

export type SubContentBlock = { id: string; category: string; content: string };
type ContentBlock = { id: string; title: string; subBlocks: SubContentBlock[] };

type CMSInterfaceState = {
  heroBanner: string;
  contentBlocks: ContentBlock[];
  setHeroBanner: (url: string) => void;
  updateBlock: (id: string, changes: Partial<ContentBlock>) => void;
  addContentBlock: () => void;
  deleteContentBlock: (id: string) => void;
  addSubBlock: (blockId: string) => void;
  deleteSubBlock: (blockId: string, subId: string) => void;
  updateSubBlock: (
    blockId: string,
    subId: string,
    changes: Partial<SubContentBlock>
  ) => void;
  reorderSubBlocks: (
    blockId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
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
              subBlocks: [
                ...b.subBlocks,
                { id: Date.now().toString(), category: '', content: '' },
              ],
            }
          : b
      )
    );
  };

  const deleteSubBlock = (blockId: string, subId: string) => {
    setContentBlocks(prev =>
      prev.map(b =>
        b.id === blockId
          ? {
              ...b,
              subBlocks: b.subBlocks.filter(sb => sb.id !== subId),
            }
          : b
      )
    );
  };

  const updateSubBlock = (
    blockId: string,
    subId: string,
    changes: Partial<SubContentBlock>
  ) => {
    setContentBlocks(prev =>
      prev.map(b =>
        b.id === blockId
          ? {
              ...b,
              subBlocks: b.subBlocks.map(sb =>
                sb.id === subId ? { ...sb, ...changes } : sb
              ),
            }
          : b
      )
    );
  };

  const reorderSubBlocks = (
    blockId: string,
    fromIndex: number,
    toIndex: number
  ) => {
    setContentBlocks(prev =>
      prev.map(b => {
        if (b.id !== blockId) return b;
        const updated = [...b.subBlocks];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        return { ...b, subBlocks: updated };
      })
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
        deleteSubBlock,
        updateSubBlock,
        reorderSubBlocks,
      }}
    >
      {children}
    </CMSInterfaceContext.Provider>
  );
}

export function useCMSInterface() {
  const ctx = useContext(CMSInterfaceContext);
  if (!ctx)
    throw new Error('useCMSInterface must be used within CMSInterfaceProvider');
  return ctx;
}
