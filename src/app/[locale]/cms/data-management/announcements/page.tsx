import { Button } from 'antd';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageContent } from '@/components/cms';
import { Link } from '@/lib/navigation';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchAnnouncements } from '@/lib/supabase/swr/announcement';
import { ROUTES } from '@/utils/constants';

import { AnnouncementsTable } from './AnnouncementsTable.client';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cms.announcement.table');
  return { title: t('title') };
}

export default async function Page() {
  const serverSupabase = createServerSupabase('admin');
  const announcements = await fetchAnnouncements(serverSupabase);
  const t = await getTranslations('cms.announcement.form');

  return (
    <PageContent
      utility={
        <Link href={ROUTES.CMS.DATA_MANAGEMENT.ANNOUNCEMENTS.CREATE}>
          <Button type="primary">{t('register')}</Button>
        </Link>
      }
    >
      <AnnouncementsTable fallbackData={announcements} />
    </PageContent>
  );
}
