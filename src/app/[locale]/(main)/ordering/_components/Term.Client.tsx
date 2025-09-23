import { useTranslations } from 'next-intl';
import Link from 'next/link';

type TermProps = {
  className?: string;
};

export default function Term({ className = '' }: TermProps) {
  const t = useTranslations('ordering');

  return (
    <div className={`flex flex-col gap-16 bg-white ${className}`}>
      <h1 className="text-14 font-semibold text-gray-00">{t('term')}</h1>
      <ul className="mb-32 flex flex-col gap-12 text-12 font-normal text-gray-00">
        <li className="flex flex-row items-center justify-between">
          {t('term_1')}
          <Link className="underline" href="/">
            {t('look')}
          </Link>
        </li>
        <li className="flex flex-row items-center justify-between">
          {t('term_2')}
          <Link className="underline" href="/">
            {t('look')}
          </Link>
        </li>
        <li className="flex flex-row items-center justify-between">
          {t('term_3')}
          <Link className="underline" href="/">
            {t('payment_agency_service_link')}
          </Link>
        </li>
      </ul>
    </div>
  );
}
