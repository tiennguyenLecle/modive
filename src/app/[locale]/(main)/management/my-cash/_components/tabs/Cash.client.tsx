import { useTranslations } from 'next-intl';

import { Button, Footer } from '@/components';

const CashClient = () => {
  const t = useTranslations('my-cash');

  const options = [
    {
      cash: 1000,
      price: 1200,
    },
    {
      cash: 3000,
      price: 3600,
    },
    {
      cash: 5000,
      price: 6000,
    },
    {
      cash: 10000,
      price: 12000,
    },
    {
      cash: 30000,
      price: 36000,
    },
    {
      cash: 50000,
      price: 60000,
    },
    {
      cash: 100000,
      price: 120000,
    },
  ];

  return (
    <>
      <div className="bg-white px-16 py-12">
        <div className="flex items-center justify-between border-b border-t border-gray-80 bg-gray-90 p-8 text-14 font-semibold text-gray-50">
          <span>{t('charging_cash')}</span>
          <span>{t('payment_amount_column')}</span>
        </div>

        <div className="flex flex-col">
          {options.map(option => (
            <div
              key={option.cash}
              className="flex items-center justify-between border-b border-gray-80 p-8 px-16 py-12 text-14 font-semibold text-gray-50"
            >
              <div className="flex-1 text-14 font-semibold text-gray-00">
                {t('cash_amount', { value: option.cash })}
              </div>
              <Button className="!w-fit min-w-120">
                {t('payment_amount', { value: option.price })}
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
