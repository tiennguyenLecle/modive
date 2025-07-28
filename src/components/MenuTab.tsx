'use client';

import React, { ComponentProps, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { cx } from '@/utils/method';

type TabItem = {
  key: string;
  label: string;
  children?: React.ReactNode;
};

type MenuTabProps = ComponentProps<'div'> & {
  tabs: TabItem[];
  defaultActiveKey?: string;
  onTabChange?: (tab: string) => void;
};

const MenuTab: React.FC<MenuTabProps> = ({
  tabs,
  defaultActiveKey,
  onTabChange,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveKey ?? tabs[0]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const activeIndex = tabs.findIndex(tab => tab.key === activeTab);

  return (
    <div className="w-full bg-white p-12">
      <div className="relative w-full" {...props}>
        <div className="flex items-center gap-12 border-b border-transparent">
          {tabs.map((tab, index) => (
            <button
              key={tab.key}
              ref={el => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(tab.key)}
              className={cx(
                'flex-1 cursor-pointer px-12 pb-16 text-16 font-semibold transition-colors',
                activeTab === tab.key ? 'text-primary' : 'text-gray-00'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <motion.div
          className="absolute bottom-0 h-2 bg-primary"
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            width: tabRefs.current[activeIndex]?.clientWidth ?? 0,
            left: tabRefs.current[activeIndex]?.offsetLeft ?? 0,
          }}
        />
      </div>
      <div className="pt-8">
        {tabs.find(tab => tab.key === activeTab)?.children}
      </div>
    </div>
  );
};

export default MenuTab;
