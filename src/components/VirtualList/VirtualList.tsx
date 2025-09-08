'use client';

import React, { useEffect, useRef, useState } from 'react';
import VirtualList from 'rc-virtual-list';

import { cx } from '@/utils/method';

import styles from './VirtualList.module.scss';

type DynamicVirtualListProps<T> = {
  data: T[];
  itemKey: string | ((item: T) => string);
  itemHeight: number;
  children: (item: T, index: number) => React.ReactNode;
  onScroll?: (e: any) => void;
  className?: string;
  defaultHeight?: number;
  containerClassName?: string;
};

function DynamicVirtualList<T>({
  data,
  itemKey,
  itemHeight,
  children,
  onScroll,
  className,
  defaultHeight,
  containerClassName,
  ...virtualListProps
}: DynamicVirtualListProps<T>) {
  const virtualListRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(defaultHeight);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight;
        if (height > 0) {
          setContainerHeight(height);
        }
      }
    };

    const timeoutId = setTimeout(updateHeight, 0);

    window.addEventListener('resize', updateHeight);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateHeight);
    };
  }, [data]);

  return (
    <div
      ref={containerRef}
      className={cx('h-full', styles.virtualList, containerClassName)}
    >
      <VirtualList<T>
        ref={virtualListRef}
        data={data}
        itemKey={itemKey}
        itemHeight={itemHeight}
        height={containerHeight}
        onScroll={onScroll}
        className={cx('h-full', className)}
        {...virtualListProps}
      >
        {children}
      </VirtualList>
    </div>
  );
}

export default DynamicVirtualList;
