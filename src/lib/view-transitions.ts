'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Store navigation history to determine direction
let navigationHistory: string[] = [];
let isInitialized = false;

// Add direction class to html element
function addDirectionClass(direction: 'forward' | 'backward') {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove(
      'transition-forward',
      'transition-backward'
    );
    document.documentElement.classList.add(`transition-${direction}`);

    // Remove class after transition completes
    setTimeout(() => {
      document.documentElement.classList.remove(
        'transition-forward',
        'transition-backward'
      );
    }, 350); // Slightly longer than animation duration
  }
}

// Determine navigation direction
function getNavigationDirection(newPath: string): 'forward' | 'backward' {
  const lastPath = navigationHistory[navigationHistory.length - 1];

  // If this path was previously visited, it's likely backward navigation
  if (navigationHistory.includes(newPath)) {
    const newPathIndex = navigationHistory.lastIndexOf(newPath);
    const lastPathIndex = navigationHistory.length - 1;

    if (newPathIndex < lastPathIndex) {
      return 'backward';
    }
  }

  // Check if we're going from a deeper path to a shallower one (likely back)
  if (
    lastPath &&
    newPath.length < lastPath.length &&
    lastPath.startsWith(newPath)
  ) {
    return 'backward';
  }

  // Default to forward
  return 'forward';
}

// Update navigation history
function updateNavigationHistory(pathname: string) {
  if (!isInitialized) {
    navigationHistory = [pathname];
    isInitialized = true;
    return;
  }

  const direction = getNavigationDirection(pathname);
  addDirectionClass(direction);

  // Update history
  if (direction === 'backward') {
    // Remove entries after the current path
    const pathIndex = navigationHistory.lastIndexOf(pathname);
    if (pathIndex !== -1) {
      navigationHistory = navigationHistory.slice(0, pathIndex + 1);
    }
  } else {
    // Add new path to history
    navigationHistory.push(pathname);
  }

  // Keep history manageable (last 10 entries)
  if (navigationHistory.length > 10) {
    navigationHistory = navigationHistory.slice(-10);
  }
}

// Hook to track navigation and add direction classes
export function useViewTransitionDirection() {
  const pathname = usePathname();

  useEffect(() => {
    updateNavigationHistory(pathname);
  }, [pathname]);
}

// Manual direction setter for specific cases
export function setTransitionDirection(direction: 'forward' | 'backward') {
  addDirectionClass(direction);
}

// Reset navigation history (useful for logout, etc.)
export function resetNavigationHistory() {
  navigationHistory = [];
  isInitialized = false;
}
