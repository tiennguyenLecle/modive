import { useTranslations } from 'next-intl';

import { Cash } from '@/assets/icons';

const ChargingClient = () => {
  const t = useTranslations('my-cash');
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
      <Cash className="mb-16 w-40 text-gray-70" />
      <p className="text-14 font-semibold text-gray-70">
        {t('no_charging_history')}
      </p>
    </div>
  );
};

export default ChargingClient;
