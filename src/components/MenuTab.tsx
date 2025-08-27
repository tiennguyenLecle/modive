'use client';

import React, {
  ComponentProps,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  /**
   * Lazy loading and performance options
   *
   * @param destroyInactiveTabPane - Default: false
   * - true: Destroy inactive tab contents to save memory (like Antd)
   * - false: Cache inactive tabs for faster switching
   *
   * @param forceRender - Default: false
   * - true: Disable lazy loading, render all tabs immediately
   * - false: Enable lazy loading, only render tabs when first visited
   */
  destroyInactiveTabPane?: boolean;
  forceRender?: boolean;
};

// Individual tab panel component optimized with memo
const TabPanel = memo<{
  tab: TabItem;
  isActive: boolean;
  children: React.ReactNode;
}>(({ tab, isActive, children }) => (
  <div
    key={tab.key}
    role="tabpanel"
    id={`panel-${tab.key}`}
    aria-labelledby={`tab-${tab.key}`}
    aria-hidden={!isActive}
    className={cx('h-full w-full', isActive ? 'block' : 'hidden')}
  >
    {children}
  </div>
));

TabPanel.displayName = 'TabPanel';

const MenuTab: React.FC<MenuTabProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  defaultActiveKey,
  onTabChange,
  className,
  destroyInactiveTabPane = false,
  forceRender = false,
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

  // Track which tabs have been visited for lazy loading
  const visitedTabsRef = useRef<Set<string>>(new Set());

  // Initialize with default active tab or first tab
  useEffect(() => {
    if (activeTab) {
      visitedTabsRef.current.add(activeTab);
    }
  }, [activeTab]);

  // Cache for rendered tab contents
  const renderedTabsRef = useRef<Map<string, React.ReactNode>>(new Map());

  // Memoize tabs that should be rendered based on lazy loading strategy
  const tabsToRender = useMemo(() => {
    if (forceRender) {
      // Force render all tabs - disable lazy loading
      return tabs.reduce(
        (acc, tab) => {
          acc[tab.key] = tab.children;
          return acc;
        },
        {} as Record<string, React.ReactNode>
      );
    }

    const result: Record<string, React.ReactNode> = {};

    for (const tab of tabs) {
      const hasBeenVisited = visitedTabsRef.current.has(tab.key);
      const isActive = activeTab === tab.key;

      if (isActive || (hasBeenVisited && !destroyInactiveTabPane)) {
        // Render if active OR (visited and not destroying inactive)
        if (!renderedTabsRef.current.has(tab.key) || isActive) {
          renderedTabsRef.current.set(tab.key, tab.children);
        }
        result[tab.key] = renderedTabsRef.current.get(tab.key);
      } else if (destroyInactiveTabPane) {
        // Remove from cache if destroying inactive tabs
        renderedTabsRef.current.delete(tab.key);
      }
    }

    return result;
  }, [tabs, activeTab, destroyInactiveTabPane, forceRender]);

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
      <div className="group-tabpanel">
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          const shouldRender = tabsToRender.hasOwnProperty(tab.key);

          if (!shouldRender) {
            return null;
          }

          return (
            <TabPanel key={tab.key} tab={tab} isActive={isActive}>
              {tabsToRender[tab.key]}
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
};

// Export memoized version for better performance
export default memo(MenuTab);
