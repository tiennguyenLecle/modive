import React from 'react';
import { useTranslations } from 'next-intl';

import KakaoTalk from '@/assets/icons/kakao-talk.svg';
import PencilIcon from '@/assets/icons/pencil.svg';
import Header from '@/components/Header';

const MyInformation = () => {
  const t = useTranslations('my_information');

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
              <p className="text-14 font-semibold text-gray-00">User 123</p>
              <div className="flex size-24 items-center justify-center rounded-8 border border-gray-70">
                <PencilIcon className="size-14 text-gray-40" />
              </div>
            </div>
          </div>

          <div className="flex h-60 items-center justify-between border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">
              {t('social_login')}
            </p>
            <div className="flex items-center gap-8">
              <KakaoTalk className="size-20 rounded-5" />
              <p className="text-14 font-semibold text-gray-00">{t('kakao')}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-12">
          <p className="text-16 font-normal text-gray-40">{t('logout')}</p>
          <div className="h-12 w-1 bg-gray-03" />
          <p className="text-16 font-normal text-gray-40">{t('withdrawal')}</p>
        </div>
      </div>
    </>
  );
};

export default MyInformation;
