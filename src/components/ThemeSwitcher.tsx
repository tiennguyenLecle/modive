'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // We only render the theme switcher on the client after the component has mounted.
  // This prevents a hydration mismatch, which can occur because the server doesn't know the
  // user's current theme and might render a different initial UI than the client.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  );
}
