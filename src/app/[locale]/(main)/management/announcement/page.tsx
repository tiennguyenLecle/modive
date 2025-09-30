import React from 'react';
import { useTranslations } from 'next-intl';

import { Header } from '@/components';

import AnnouncementClient from './Announcement.client';

const AnnouncementPage: React.FC = () => {
  const t = useTranslations('announcement_page');
  return (
    <main>
      <Header
        showBackButton
        pageTitle={t('page_title')}
        className="sticky top-0 z-10 border-b border-gray-80"
      />
      <AnnouncementClient />
    </main>
  );
};

export default AnnouncementPage;
