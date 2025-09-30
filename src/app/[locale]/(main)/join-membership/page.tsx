import { ConfigProvider } from 'antd';
import { getTranslations } from 'next-intl/server';

import { Header } from '@/components';
import { getServerAuth } from '@/lib/authentication/server-auth';
import { redirect } from '@/lib/navigation';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchMeExtraData } from '@/lib/supabase/swr/users';
import { ROUTES } from '@/utils/constants';

import JoinMembershipClient from './JoinMembership.client';

const JoinMembershipPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = await getTranslations('join_membership');
  const supabase = createServerSupabase('user');
  const user = await getServerAuth();

  let initialValues = {};
  if (user) {
    let me: any = null;
    try {
      me = await fetchMeExtraData(supabase, user.id);
    } catch (error) {
      console.log('error join member ship');
      // Continue with empty initialValues
    }

    if (!me) return;
    if (me.is_profile_complete) {
      console.log('Redirect to home', me.is_profile_complete, locale);
      return redirect({ href: ROUTES.HOME, locale });
    }

    initialValues = {
      userId: user.id,
      name: me.name,
      phone: me.phone,
      nickname: me.nickname,
      birthday: me.date_of_birth,
    };
  }

  return (
    <main className="flex h-screen flex-col">
      <Header
        pageTitle={t('title')}
        className="sticky top-0 z-10 border-b border-gray-80"
      />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF627B',
          },
        }}
      >
        <JoinMembershipClient initialValues={initialValues} />
      </ConfigProvider>
    </main>
  );
};

export default JoinMembershipPage;
