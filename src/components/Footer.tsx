import { useLocale, useTranslations } from 'next-intl';

import { Logo } from '@/assets/icons';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const address =
    locale === 'ko'
      ? '서울특별시 마포구 성암로 267 (03925)'
      : '267 (03925) Seongam-ro, Mapo-gu, Seoul';

  return (
    <footer>
      <div className="flex w-full flex-col gap-16 bg-white px-16 py-28">
        <div className="flex flex-wrap items-center justify-between">
          <p className="text-12 font-semibold text-gray-30">{t('terms')}</p>
          <div className="h-8 w-1 bg-gray-80"></div>
          <p className="text-12 font-semibold text-gray-30">
            {t('privacy_policy')}
          </p>
          <div className="h-8 w-1 bg-gray-80"></div>
          <p className="text-12 font-semibold text-gray-30">
            {t('customer_service')}
          </p>
          <div className="h-8 w-1 bg-gray-80"></div>
          <p className="text-12 font-semibold text-gray-30">
            {t('copyright_policy')}
          </p>
        </div>

        <Logo />
        <address className="text-12 font-normal leading-1.66 tracking-0.4 text-gray-30">
          {t('info_name')}
          <br />
          {t('info_number', { phoneNumber: '107-81-78996' })}
          <br />
          {t('info_address', { address })}
          <br />
          <a href="mailto:mailname@email.com" />
        </address>
        <small className="text-12 font-normal tracking-0.4 text-gray-30">
          {t('copyright', { year: 2023 })}
        </small>
      </div>
    </footer>
  );
}
