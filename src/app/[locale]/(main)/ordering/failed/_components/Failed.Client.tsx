import { useTranslations } from 'next-intl';

export default function FailPage() {
  const t = useTranslations('ordering');
  return (
    <div className="flex h-full w-full items-center justify-center text-center text-16 font-normal text-gray-00">
      {t('order_failed')}
    </div>
  );
}
