import { createNavigation } from 'next-intl/navigation';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './locale';

// Define routing config using centralized constants
const routing = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
} as const;

// Create navigation utilities
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
