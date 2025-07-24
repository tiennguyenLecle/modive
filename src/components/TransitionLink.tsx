'use client';

import { ComponentProps } from 'react';
import { Link as NextViewTransitionsLink } from 'next-view-transitions';

import { usePathname } from '@/lib/navigation';
import { setTransitionDirection } from '@/lib/view-transitions';

type TransitionLinkProps = ComponentProps<typeof NextViewTransitionsLink> & {
  href: string;
  forceDirection?: 'forward' | 'backward';
};

export function TransitionLink({
  href,
  children,
  forceDirection,
  onClick,
  ...props
}: TransitionLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (forceDirection) {
      setTransitionDirection(forceDirection);
    } else {
      // Auto-detect direction based on URL structure
      const isBackNavigation =
        pathname.length > href.length && pathname.startsWith(href);
      setTransitionDirection(isBackNavigation ? 'backward' : 'forward');
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <NextViewTransitionsLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextViewTransitionsLink>
  );
}
