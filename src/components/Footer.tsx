import { useTranslations } from 'next-intl';

import Logo from '@/assets/icons/logo.svg';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer>
      <div className="flex w-full flex-col gap-16 bg-white p-[28px_16px]">
        <div className="flex items-center justify-between">
          <p className="text-12 font-[600] text-[#575665]">{t('terms')}</p>
          <div className="h-8 w-1 bg-[#F0EFF1]"></div>
          <p className="text-12 font-[600] text-[#575665]">
            {t('privacy_policy')}
          </p>
          <div className="h-8 w-1 bg-[#F0EFF1]"></div>
          <p className="text-12 font-[600] text-[#575665]">
            {t('customer_service')}
          </p>
          <div className="h-8 w-1 bg-[#F0EFF1]"></div>
          <p className="text-12 font-[600] text-[#575665]">
            {t('copyright_policy')}
          </p>
        </div>

        <Logo />
        <p className="text-12 font-[400] tracking-0.4 text-[#575665]">
          {t('info_name')}
          <br />
          {t('info_number')}
          <br />
          {t('info_address')}
          <br />
          {t('info_email')}
        </p>
        <p className="text-12 font-[400] tracking-0.4 text-[#575665]">
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
}
