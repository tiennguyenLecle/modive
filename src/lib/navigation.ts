import { createNavigation } from 'next-intl/navigation';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './locale';

// Define routing config using centralized constants
const routing = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
} as const;

// Create navigation utilities
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
