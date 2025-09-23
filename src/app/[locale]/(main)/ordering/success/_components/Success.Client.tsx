'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Info as InfoIcon } from '@/assets/icons';
import { CartItemProps } from '@/atoms/goodsAtom';
import Button from '@/components/Button';
import { ROUTES } from '@/utils/constants';

import ProductInfo from '../../_components/ProductInformation.Client';
import InfoBlock from '../../../shopping-cart/_components/InfoBlock.Client';
import Info from './Info.Client';
import InfoList from './InfoList.Client';

type InfoItemProps = {
  label: ReactNode;
  value: any;
};

type SuccessPageProps = {
  paymentInfoList: InfoItemProps[];
  shippingInfoList: InfoItemProps[];
  orderItems: CartItemProps[];
  orderId: string;
  status: string;
  scheduledDateInfo: string[];
};

export default function SuccessPage({
  paymentInfoList,
  shippingInfoList,
  orderItems,
  orderId,
  status,
  scheduledDateInfo,
}: SuccessPageProps) {
  const t = useTranslations('ordering');
  const router = useRouter();

  return (
    <>
      <div className="container flex h-56 items-center gap-12 border-b border-t border-gray-80">
        <h1 className="flex-1 text-center text-16 font-bold">
          {t('order_completion')}
        </h1>
      </div>
      <div className="relative flex max-h-[calc(100dvh-56rem)] flex-col gap-8 overflow-y-auto overflow-x-hidden bg-gray-90">
        <Info
          orderNumber={orderId}
          status={status}
          scheduledDateInfo={scheduledDateInfo}
        />

        <ProductInfo
          items={orderItems as CartItemProps[]}
          title={t('order_product_information')}
          totalProduct={`${orderItems?.length ?? 0} ${t('pieces')}`}
        />

        <InfoList title={t('payment_information')} infoList={paymentInfoList} />

        <div>
          <InfoList
            title={t('shipping_information')}
            infoList={shippingInfoList}
          >
            <InfoBlock className="mx-24 mb-48 flex-col px-24 text-gray-50">
              <div className="mb-8 flex flex-1 flex-row items-center gap-8">
                <InfoIcon className="h-18 w-18 text-gray-60" />{' '}
                {t('information')}
              </div>
              <ul className="flex flex-1 list-disc flex-col gap-8 pl-20">
                <li>{t('noti_01')}</li>
                <li>{t('noti_02')}</li>
              </ul>
            </InfoBlock>
          </InfoList>

          <div className="flex flex-row items-center justify-between gap-12 bg-white p-16">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => router.push(ROUTES.GOODS)}
            >
              {t('continue_shopping_btn')}
            </Button>
            <Button variant="primary" className="w-full">
              {t('order_detail_btn')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
