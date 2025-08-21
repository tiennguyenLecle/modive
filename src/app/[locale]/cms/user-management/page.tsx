import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageContent } from '@/components/cms';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchUsers } from '@/lib/supabase/swr/users';

import UsersManagementTableClient from './UsersManagementTable.client';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cms.user_management.table');
  return { title: t('title') };
}

export default async function Page() {
  const serverSupabase = createServerSupabase('admin');
  const users = await fetchUsers(serverSupabase);

  return (
    <PageContent>
      <UsersManagementTableClient fallbackData={users} />
    </PageContent>
  );
}
