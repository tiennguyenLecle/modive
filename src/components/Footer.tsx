import { ComponentProps } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { LogoMoit } from '@/assets/icons';
import { Link } from '@/lib/navigation';
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
        <Link
          href={
            'https://comfortable-margin-430.notion.site/27677f3875ab8043b739e9592c06341a'
          }
          target="_blank"
          className="text-12 font-semibold text-gray-30"
        >
          {t('terms')}
        </Link>
        <div className="h-8 w-1 bg-gray-80"></div>
        <Link
          href={
            'https://comfortable-margin-430.notion.site/27a77f3875ab80edbe21cbd2467f7d1d'
          }
          target="_blank"
          className="text-12 font-semibold text-gray-30"
        >
          {t('privacy_policy')}
        </Link>
        <div className="h-8 w-1 bg-gray-80"></div>
        <Link
          href={'http://pf.kakao.com/_xkxlgkn'}
          target="_blank"
          className="text-12 font-semibold text-gray-30"
        >
          {t('customer_service')}
        </Link>
        {/* <div className="h-8 w-1 bg-gray-80"></div>
        <Link
          href={
            'https://comfortable-margin-430.notion.site/27677f3875ab8043b739e9592c06341a'
          }
          target="_blank"
          className="text-12 font-semibold text-gray-30"
        >
          {t('copyright_policy')}
        </Link> */}
      </div>
      <LogoMoit className="h-24 w-82 text-gray-70" />
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
        {t('representative_number', { number: '02-789-0011' })}
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
