import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageContent } from '@/components/cms';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchUserDetail } from '@/lib/supabase/swr/users';

import UserDetailClient from './UserDetail.client';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cms.user_management.detail');
  return { title: t('title') };
}
const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const serverSupabase = createServerSupabase('admin');
  const user = await fetchUserDetail(serverSupabase, id);
  return (
    <PageContent>
      <UserDetailClient id={id} fallbackData={user} />
    </PageContent>
  );
};

export default Page;
