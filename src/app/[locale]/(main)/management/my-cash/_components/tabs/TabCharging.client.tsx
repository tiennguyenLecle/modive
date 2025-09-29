import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { Cash } from '@/assets/icons';
import { cx } from '@/utils/method';

import { useMyCash } from '../../provider';

const ChargingClient = () => {
  const t = useTranslations('my-cash.charging');

  const { purchaseHistory } = useMyCash();

  if (!purchaseHistory?.length) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-gray-100">
        <Cash className="mb-16 w-40 text-gray-70" />
        <p className="text-14 font-semibold text-gray-70">
          {t('no_charging_history')}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="border-b border-gray-80 bg-white px-24 py-12">
        <p className="text-12 font-normal leading-1.66 -tracking-0.4 text-label-secondary">
          {t('within_one_year')}
        </p>
      </div>
      <ul className="list-disc bg-white">
        {purchaseHistory.map((transaction, index) => (
          <li
            className={cx(
              'mx-16 flex flex-col gap-4 py-12 pl-8',
              index !== 0 && 'border-t border-gray-80'
            )}
            key={transaction.id}
          >
            <div className="h-28 w-fit rounded-4 bg-[#F5F5F7] px-8 py-4">
              <p className="text-12 font-semibold text-gray-50">
                {t('cash_charging')}
              </p>
            </div>
            <div className="flex justify-between gap-12">
              <p className="text-14 font-semibold text-gray-00">
                {t('cash', { cash: transaction.amount.toLocaleString() })}
              </p>
              <p className="text-right text-14 font-normal text-gray-50">
                {dayjs(transaction?.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChargingClient;
