import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';

import {
  NavChat,
  NavHome,
  NavHomeFilled,
  NavPerson,
  NavPersonFilled,
  NavVase,
} from '@/assets/icons';
import { ROUTES } from '@/utils/constants';
import { cx } from '@/utils/method';

import NavItem from './NavItem';

type NavigationProps = ComponentProps<'nav'>;

const activePaths = {
  [ROUTES.HOME]: [ROUTES.HOME, ROUTES.INTRODUCTION],
  [ROUTES.CHAT]: [ROUTES.CHAT],
  [ROUTES.GOODS]: [ROUTES.GOODS],
  [ROUTES.MANAGEMENT.INDEX]: [ROUTES.MANAGEMENT.INDEX],
};

export default function Navigation({ className, ...rest }: NavigationProps) {
  const t = useTranslations('nav');

  return (
    <nav
      className={cx('flex h-56 border-t border-gray-90 bg-white', className)}
      {...rest}
    >
      <NavItem
        href={ROUTES.HOME}
        icon={<NavHome />}
        activeIcon={<NavHomeFilled />}
        text={t('home')}
        activePaths={activePaths[ROUTES.HOME]}
      />
      <NavItem
        href={ROUTES.CHAT}
        icon={<NavChat />}
        text={t('chat')}
        activePaths={activePaths[ROUTES.CHAT]}
      />
      <NavItem
        href={ROUTES.GOODS}
        icon={<NavVase />}
        text={t('goods')}
        activePaths={activePaths[ROUTES.GOODS]}
      />
      <NavItem
        href={ROUTES.MANAGEMENT.INDEX}
        icon={<NavPerson />}
        activeIcon={<NavPersonFilled />}
        text={t('me')}
        activePaths={activePaths[ROUTES.MANAGEMENT.INDEX]}
      />
    </nav>
  );
}
