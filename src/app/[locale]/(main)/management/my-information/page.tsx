'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import {
  Pencil,
  SocialApple2,
  SocialGoogle,
  SocialKakaoTalk2,
} from '@/assets/icons';
import { Header } from '@/components';
import { useAuth } from '@/lib/authentication/auth-context';
import { SOCIAL_PROVIDERS } from '@/utils/constants';

import ModalLogout from './_components/ModalLogout';
import ModalWidrawal from './_components/ModalWidrawal';

const { GOOGLE, APPLE, KAKAO } = SOCIAL_PROVIDERS;
export default function MyInformation() {
  const t = useTranslations('my_information');
  const { user } = useAuth();
  const withdrawalModalRef =
    React.useRef<React.ElementRef<typeof ModalWidrawal>>(null);
  const logOutModalRef =
    React.useRef<React.ElementRef<typeof ModalLogout>>(null);

  const activeProviders = useMemo(() => {
    const { providers } = user?.app_metadata || {};
    const iss = user?.user_metadata?.iss;
    let currentProvider:
      | (typeof SOCIAL_PROVIDERS)[keyof typeof SOCIAL_PROVIDERS]
      | null = null;

    switch (true) {
      case iss?.includes(GOOGLE):
        currentProvider = GOOGLE;
        break;
      case iss?.includes(APPLE):
        currentProvider = APPLE;
        break;
      case iss?.includes(KAKAO):
        currentProvider = KAKAO;
        break;
    }

    if (!Array.isArray(providers)) return [];

    return [
      ...providers.filter((p: string) => p !== currentProvider),
      currentProvider,
    ];
  }, [user]);

  const socialName = useMemo(() => {
    return {
      kakao: t('kakao'),
      google: t('google'),
      apple: t('apple'),
    };
  }, [t]);

  const socialIcon = useMemo(() => {
    return {
      kakao: <SocialKakaoTalk2 className="size-20 rounded-5" />,
      google: <SocialGoogle className="size-20 rounded-5" />,
      apple: <SocialApple2 className="size-20 rounded-5" />,
    };
  }, []);

  return (
    <>
      <Header pageTitle={t('my_infomation')} showBackButton />
      <main className="flex h-full flex-col justify-between bg-gray-90 pb-24">
        <div className="flex flex-col bg-white px-16">
          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">{t('nickname')}</p>
            <div className="flex items-center gap-8">
              <p className="text-14 font-semibold text-gray-00">
                {user?.user_metadata?.full_name}
              </p>
              <div className="flex size-24 items-center justify-center rounded-8 border border-gray-70">
                <Pencil className="size-14 text-gray-40" />
              </div>
            </div>
          </div>

          <div className="flex h-60 items-center justify-between border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">
              {t('social_login')}
            </p>
            <div className="flex items-center gap-8">
              {activeProviders?.map((provider: keyof typeof socialIcon) => (
                <span key={provider} className="bg-white">
                  {socialIcon[provider]}
                </span>
              ))}
              <span className="text-14 font-semibold">
                {
                  socialName[
                    activeProviders?.[
                      activeProviders.length - 1
                    ] as keyof typeof socialName
                  ]
                }
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="cursor- px-6 text-16 font-normal text-gray-40"
            onClick={() => logOutModalRef.current?.open()}
          >
            {t('logout')}
          </button>
          <div className="h-12 w-1 bg-gray-03" />
          <button
            className="px-6 text-16 font-normal text-gray-40"
            onClick={() => withdrawalModalRef.current?.open()}
          >
            {t('withdrawal')}
          </button>
        </div>
      </main>
      <ModalLogout ref={logOutModalRef} />
      <ModalWidrawal ref={withdrawalModalRef} />
    </>
  );
}
