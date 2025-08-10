import React from 'react';
import { useTranslations } from 'next-intl';

import ArrowRight from '@/assets/icons/arrow-right.svg';
import { Header } from '@/components';
import { Link } from '@/lib/navigation';
import { ROUTES } from '@/utils/constants';

const MyPage = () => {
  const t = useTranslations('my_page');

  return (
    <>
      <Header
        className="mx-auto w-[360rem]"
        pageTitle={t('my_page')}
        showAlarmIcon
        showCashIcon
      />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col bg-white px-16">
          <Link href={ROUTES.MANAGEMENT.MY_INFORMATION}>
            <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
              <p className="text-16 font-normal text-gray-00">
                {t('my_infomation')}
              </p>
              <ArrowRight className="h-18 w-18 text-gray-00" />
            </div>
          </Link>
          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">{t('my_money')}</p>
            <ArrowRight className="h-18 w-18 text-gray-00" />
          </div>

          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">
              {t('noti-settings')}
            </p>
            <ArrowRight className="h-18 w-18 text-gray-00" />
          </div>
        </div>

        <div className="flex flex-col bg-white px-16">
          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">
              {t('announcement')}
            </p>
            <ArrowRight className="h-18 w-18 text-gray-00" />
          </div>

          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">
              {t('customer_support')}
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white px-16">
          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">
              {t('terms_conditions')}
            </p>
          </div>

          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">
              {t('privacy_policy')}
            </p>
          </div>

          <div className="flex h-60 items-center justify-between border-b border-gray-90 px-16">
            <p className="text-16 font-normal text-gray-00">
              {t('copyright_policy')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
