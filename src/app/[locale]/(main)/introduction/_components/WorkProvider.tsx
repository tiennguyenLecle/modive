'use client';

import { createContext, useContext } from 'react';

import { WorkType } from '@/types/work';

type WorkContextType = {
  workDetail: WorkType | null;
};

const WorkContext = createContext<WorkContextType>({
  workDetail: null,
});

type WorkProviderProps = {
  workDetail: WorkType;
  children: React.ReactNode;
};

export function WorkProvider({ workDetail, children }: WorkProviderProps) {
  return (
    <WorkContext.Provider value={{ workDetail }}>
      {children}
    </WorkContext.Provider>
  );
}

export function useWork() {
  const context = useContext(WorkContext);
  if (!context) {
    throw new Error('useWork must be used within a WorkProvider');
  }
  return context;
}
