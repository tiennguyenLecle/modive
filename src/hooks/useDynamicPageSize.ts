import React, { useCallback, useEffect } from 'react';

/**
 * Utility hook to calculate dynamic page size based on container dimensions
 */
export function useDynamicPageSize(
  options: {
    containerRef?: React.RefObject<HTMLElement>;
    estimatedItemHeight?: number;
    minPageSize?: number;
    maxPageSize?: number;
    bufferMultiplier?: number;
  } = {}
) {
  const {
    containerRef,
    estimatedItemHeight = 80,
    minPageSize = 10,
    maxPageSize = 50,
    bufferMultiplier = 1.2,
  } = options;

  const calculatePageSize = useCallback(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      // Return default page size for SSR
      return minPageSize;
    }

    // Use container height if ref provided, otherwise fallback to screen height
    let availableHeight = window.innerHeight;

    if (containerRef?.current) {
      const containerHeight = containerRef.current.clientHeight;
      if (containerHeight > 0) {
        availableHeight = containerHeight;
      }
    }

    const itemsOnScreen = Math.ceil(availableHeight / estimatedItemHeight);
    const bufferedSize = Math.ceil(itemsOnScreen * bufferMultiplier);

    return Math.min(Math.max(bufferedSize, minPageSize), maxPageSize);
  }, [
    containerRef,
    estimatedItemHeight,
    minPageSize,
    maxPageSize,
    bufferMultiplier,
  ]);

  const [pageSize, setPageSize] = React.useState(() => calculatePageSize());

  // Update page size on client-side mount (hydration)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const clientPageSize = calculatePageSize();
      setPageSize(clientPageSize);
    }
  }, [calculatePageSize]); // Include calculatePageSize dependency

  useEffect(() => {
    // Skip effect on server-side
    if (typeof window === 'undefined') {
      return;
    }

    const recalculate = () => {
      const newPageSize = calculatePageSize();
      setPageSize(newPageSize);
    };

    // Recalculate on window resize
    window.addEventListener('resize', recalculate);

    return () => {
      window.removeEventListener('resize', recalculate);
    };
  }, [calculatePageSize, containerRef]);

  return {
    recommendedPageSize: pageSize,
    calculatePageSize,
  };
}
