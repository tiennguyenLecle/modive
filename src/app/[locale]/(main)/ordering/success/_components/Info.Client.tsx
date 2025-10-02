'use client';

import { useTranslations } from 'next-intl';

// import { formatDateOrTime } from '@/utils/formatTime';
import { mapOrderStatus } from '../../../order-inquiry/utils';

// import InfoBlock from '../../../shopping-cart/_components/InfoBlock.Client';

type InfoProps = {
  orderNumber: string;
  status: string;
  scheduledDateInfo: string[];
};

export default function Info({
  orderNumber,
  status,
  // scheduledDateInfo,
}: InfoProps) {
  const t = useTranslations('ordering');

  return (
    <div className="flex flex-col gap-16 bg-white p-16">
      <h3 className="text-center text-20 font-medium text-gray-00">
        <span>{t('order_successfully')}</span>
        <br />
        <span>{t('order_completed')}</span>
      </h3>
      <h4 className="text-center text-14 font-normal text-gray-30">
        {t('order_number')} {orderNumber}
      </h4>
      {/* {scheduledDateInfo.map((date, index) => (
        <InfoBlock
          key={index}
          scheduledDate={formatDateOrTime(date, 'date')}
          title={t('pre_sale_product')}
        />
      ))} */}
    </div>
  );
}
