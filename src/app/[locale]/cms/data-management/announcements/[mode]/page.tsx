import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { AnnouncementForm } from './_components/AnnouncementForm.client';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cms.announcement.form');
  return { title: t('title_create') };
}

export default async function CreateAnnouncementPage({
  params,
}: {
  params: { mode: string };
}) {
  const { mode } = params;
  if (mode !== 'create') return notFound();
  return <AnnouncementForm mode={mode} />;
}
