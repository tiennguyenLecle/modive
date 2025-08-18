'use client';

import React, { ComponentProps, useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { cx } from '@/utils/method';

type TabItem = ComponentProps<'div'> & {
  key: string;
  label: string;
  children?: React.ReactNode;
};

type MenuTabProps = ComponentProps<'div'> & {
  tabs: TabItem[];
  // Controlled mode: parent controls the state
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  // Uncontrolled mode: component manages its own state
  defaultActiveKey?: string;
};

const MenuTab: React.FC<MenuTabProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  defaultActiveKey,
  onTabChange,
  className,
  ...props
}) => {
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledActiveTab !== undefined;

  // Validate defaultActiveKey exists in tabs
  const validDefaultKey =
    defaultActiveKey && tabs?.some(tab => tab.key === defaultActiveKey)
      ? defaultActiveKey
      : tabs?.[0]?.key;

  const [internalActiveTab, setInternalActiveTab] = useState(validDefaultKey);

  // Use controlled or internal state
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  // Memoize active tab children
  const activeTabChildren = useMemo(
    () => tabs?.find(tab => tab.key === activeTab)?.children,
    [tabs, activeTab]
  );

  const handleTabClick = useCallback(
    (tab: string) => {
      if (!isControlled) {
        setInternalActiveTab(tab);
      }
      onTabChange?.(tab);
    },
    [isControlled, onTabChange]
  );

  // Validate tabs array after all hooks
  if (!tabs || tabs.length === 0) {
    console.warn('MenuTab: tabs array is empty or undefined');
    return null;
  }

  return (
    <div className={cx('w-full bg-white', className)} {...props}>
      <div
        className="container relative flex h-48 items-center gap-12 border-b border-gray-90"
        role="tablist"
        aria-label="Menu tabs"
      >
        {tabs.map(tab => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-controls={`panel-${tab.key}`}
            id={`tab-${tab.key}`}
            className={cx(
              'relative line-clamp-1 flex-1 cursor-pointer text-ellipsis whitespace-nowrap px-16 py-12 text-16 font-semibold transition-colors',
              activeTab === tab.key
                ? 'text-primary'
                : 'hover:text-gray-600 text-gray-00'
            )}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-2 bg-primary"
                layoutId="indicator"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            )}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTabChildren}
      </div>
    </div>
  );
};

export default MenuTab;
