'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { Pencil, SocialGoogle, SocialKakaoTalk } from '@/assets/icons';
import { Header, ModalHandle } from '@/components';
import { useAuth } from '@/lib/authentication/auth-context';

import ModalLogout from './_components/ModalLogout';
import ModalWidrawal from './_components/ModalWidrawal';

const MyInformation = () => {
  const t = useTranslations('my_information');
  const { user } = useAuth();
  const withdrawalModalRef = React.useRef<ModalHandle>(null);
  const logOutModalRef = React.useRef<ModalHandle>(null);

  console.log(user);

  return (
    <>
      <Header
        className="mx-auto w-[360rem]"
        pageTitle={t('my_infomation')}
        showBackButton
      />
      <div className="flex h-full flex-col justify-between bg-gray-90 pb-24">
        <div className="flex flex-col bg-white px-16">
          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">{t('nickname')}</p>
            <div className="flex gap-8">
              <p className="text-14 font-semibold text-gray-00">
                {user?.user_metadata?.name}
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
              {user?.app_metadata?.provider === 'kakao' && (
                <>
                  <SocialKakaoTalk className="size-20 rounded-5" />
                  <p className="text-14 font-semibold text-gray-00">
                    {t('kakao')}
                  </p>
                </>
              )}
              {user?.app_metadata?.provider === 'google' && (
                <>
                  <SocialGoogle className="size-20 rounded-5" />
                  <p className="text-14 font-semibold text-gray-00">
                    {t('google')}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-12">
          <p
            className="text-16 font-normal text-gray-40"
            onClick={() => logOutModalRef.current?.open()}
          >
            {t('logout')}
          </p>
          <div className="h-12 w-1 bg-gray-03" />
          <p
            className="text-16 font-normal text-gray-40"
            onClick={() => withdrawalModalRef.current?.open()}
          >
            {t('withdrawal')}
          </p>
        </div>
      </div>
      <ModalLogout ref={logOutModalRef} />
      <ModalWidrawal ref={withdrawalModalRef} />
    </>
  );
};

export default MyInformation;
