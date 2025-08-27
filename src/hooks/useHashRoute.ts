'use client';

import { useCallback, useEffect, useState } from 'react';

const getHash = () =>
  typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';

export function useHashRoute(
  defaultValue: string
): [string, (newHash: string, replace?: boolean) => void] {
  const [hash, setHash] = useState(getHash() || defaultValue);

  const handleHashChange = useCallback(() => {
    setHash(getHash());
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  const updateHash = useCallback(
    (newHash: string, replace = false) => {
      if (newHash !== hash) {
        setHash(newHash);
        if (replace) {
          const newUrl = `${window.location.pathname}${window.location.search}#${newHash}`;
          window.history.replaceState(null, '', newUrl);
        } else {
          window.location.hash = newHash;
        }
      }
    },
    [hash]
  );

  return [hash, updateHash];
}
