import { ComponentProps } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { Logo } from '@/assets/icons';
import { cx } from '@/utils/method';

export default function Footer({
  className,
  ...props
}: ComponentProps<'footer'>) {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer
      className={cx(
        'flex w-full flex-col gap-16 bg-white px-16 py-28',
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-12">
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
      <Logo width={82} height={24} />
      <address className="mb-0 text-12 font-normal leading-1.66 text-gray-30">
        {t('info_name')}
        <br />
        {t('info_number', { phoneNumber: '116-81-13833' })}
        <br />
        {t('info_address')}
        <br />
        {t('business_report_number', {
          businessReportNumber: '2016-서울마포-0494',
        })}
        <br />
        <br />
        <a href="mailto:moit@modive.me">moit@modive.me</a>
      </address>
      <small className="text-12 font-normal text-gray-30">
        {t('copyright', { year: 2025 })}
      </small>
    </footer>
  );
}
