import { useTranslations } from 'next-intl';

import { Button, Footer } from '@/components';

import { useMyCash } from '../../provider';

const CashClient = () => {
  const t = useTranslations('my-cash');
  const { coinPackages, purchaseCoins } = useMyCash();

  return (
    <>
      <div className="bg-white px-16 py-12">
        <div className="flex items-center justify-between border-b border-t border-gray-80 bg-gray-90 p-8 text-14 font-semibold text-gray-50">
          <span>{t('charging_cash')}</span>
          <span>{t('payment_amount_column')}</span>
        </div>

        <div className="flex flex-col">
          {coinPackages?.map(option => (
            <div
              key={option.id}
              className="flex items-center justify-between border-b border-gray-80 p-8 px-16 py-12 text-14 font-semibold text-gray-50"
            >
              <div className="flex-1 text-14 font-semibold text-gray-00">
                {t('cash_amount', {
                  value: option.coins_credit.toLocaleString(),
                })}
              </div>
              <Button
                className="!w-fit min-w-120"
                onClick={() => {
                  purchaseCoins.trigger({ coinPackageId: option.id });
                }}
              >
                {t('payment_amount', { value: option.price.toLocaleString() })}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white px-16 py-24">
        <p className="mb-12 text-14 font-semibold leading-normal text-gray-30">
          {t('use_guide')}
        </p>
        <ul className="list-disc pl-12 text-14 font-normal leading-1.66 -tracking-0.4 text-[#8C8C8C]">
          <li>{t('use_guide_1')}</li>
          <li>{t('use_guide_2')}</li>
          <li>{t('use_guide_3')}</li>
          <li>{t('use_guide_4')}</li>
          <li>{t('use_guide_5')}</li>
        </ul>
      </div>
      <Footer className="mt-8" />
    </>
  );
};

export default CashClient;
