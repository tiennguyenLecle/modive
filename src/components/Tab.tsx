'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MenuTabProps {
  tabs: string[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

const Tab: React.FC<MenuTabProps> = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="bg-white relative w-full">
      <div className="flex border-b border-transparent">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={el => {
              tabRefs.current[index] = el;
            }}
            onClick={() => handleTabClick(tab)}
            className={`flex-1 cursor-pointer px-[12px] pb-[16px] text-16 font-[600] transition-colors ${
              activeTab === tab ? 'text-[#FF627B]' : 'text-[#333333]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <motion.div
        className="absolute bottom-0 h-1 bg-[#FF627B]"
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: tabRefs.current[tabs.indexOf(activeTab)]?.clientWidth ?? 0,
          left: tabRefs.current[tabs.indexOf(activeTab)]?.offsetLeft ?? 0,
        }}
      />
    </div>
  );
};

export default Tab;
