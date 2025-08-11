import { getTranslations } from 'next-intl/server';

import { getServerAuth } from '@/lib/authentication/server-auth';
import { createClient } from '@/lib/supabase/server';

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = await getTranslations({ namespace: 'chat_page.metadata', locale });
  return {
    title: t('title'),
    description: t('description'),
  };
};

export default async function Home() {
  const t = await getTranslations();
  const user = await getServerAuth();
  const supabase = await createClient();

  let userRow: unknown = null;
  const debugErrors: string[] = [];

  try {
    const userId = user?.id;
    if (userId) {
      const [userList] = await Promise.all([
        supabase.schema('public').from('users').select('*'),
      ]);

      userRow = userList.data ?? null;
    }
  } catch (e: any) {
    debugErrors.push(`unexpected: ${e?.message || String(e)}`);
  }

  return (
    <main className="flex h-full flex-col">
      <div className="flex h-56 items-center justify-center border-b border-t border-gray-80">
        <h1 className="mb-4 text-16 font-semibold">View Session</h1>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-auto">
        <div>Server Auth State</div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </main>
  );
}
