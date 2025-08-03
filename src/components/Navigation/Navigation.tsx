import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';

import NavChat from '@/assets/icons/nav-chat.svg';
import NavHomeFilled from '@/assets/icons/nav-home-filled.svg';
import NavHome from '@/assets/icons/nav-home.svg';
import NavPersonFilled from '@/assets/icons/nav-person-filled.svg';
import NavPerson from '@/assets/icons/nav-person.svg';
import NavVase from '@/assets/icons/nav-vase.svg';
import { ROUTES } from '@/utils/constants';
import { cx } from '@/utils/method';

import NavItem from './NavItem';

type NavigationProps = ComponentProps<'nav'>;

export default function Navigation({ className, ...rest }: NavigationProps) {
  const t = useTranslations('nav');

  return (
    <nav
      className={cx('flex h-56 border-t border-gray-90', className)}
      {...rest}
    >
      <NavItem
        href={ROUTES.HOME}
        icon={<NavHome />}
        activeIcon={<NavHomeFilled />}
        text={t('home')}
      />
      <NavItem href={ROUTES.CHAT} icon={<NavChat />} text={t('chat')} />
      <NavItem href={ROUTES.GOODS} icon={<NavVase />} text={t('goods')} />
      <NavItem
        href={ROUTES.MY_PAGE}
        icon={<NavPerson />}
        activeIcon={<NavPersonFilled />}
        text={t('me')}
      />
    </nav>
  );
}
