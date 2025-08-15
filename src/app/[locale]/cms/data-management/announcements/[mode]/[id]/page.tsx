import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchAnnouncementDetail } from '@/lib/supabase/swr/announcement';

import { AnnouncementForm } from '../_components/AnnouncementForm.client';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cms.announcement.form');
  return { title: t('title_edit') };
}

export default async function EditAnnouncementPage({
  params,
}: {
  params: { mode: string; id: string };
}) {
  const { mode, id } = params;
  if (mode !== 'edit' || !id) return notFound();

  const serverSupabase = createServerSupabase('admin');
  const announcementDetail = await fetchAnnouncementDetail(serverSupabase, id);

  return (
    <AnnouncementForm
      mode={mode}
      announcementId={id}
      fallbackData={announcementDetail}
    />
  );
}
