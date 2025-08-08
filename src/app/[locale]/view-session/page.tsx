import { getTranslations } from 'next-intl/server';

import { Navigation } from '@/components';
import { getServerAuth } from '@/lib/server-auth';

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
  const { status, user, session, supabase } = await getServerAuth();

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
    <div className="flex h-full flex-col">
      <div className="flex h-56 items-center justify-center border-b border-t border-gray-80">
        <h1 className="mb-4 text-16 font-semibold">View Session</h1>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <div>Server Auth State</div>
        <pre>{JSON.stringify({ status, user, session }, null, 2)}</pre>
        <div className="mt-4" />
        <div>Supabase next_auth snapshot</div>
        <pre>
          {JSON.stringify(
            {
              userRow,
              errors: debugErrors,
            },
            null,
            2
          )}
        </pre>
      </div>
      <Navigation />
    </div>
  );
}
