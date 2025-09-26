'use client';

import React from 'react';
import { List } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import NProgress from 'nprogress';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWRInfinite from 'swr/infinite';

import Loading from '@/app/[locale]/loading';
import { ArrowRight } from '@/assets/icons';
import Button from '@/components/Button';
import {
  fetchMyOrders,
  MyOrdersGroupedItemType,
  OrderResponseType,
} from '@/lib/supabase/swr/order';
import { formatDateByLocale } from '@/utils/formatTime';

import ProductInformation from '../../ordering/_components/ProductInformation.Client';
import { mappedCartItems } from '../../shopping-cart/_components/utils';
import { mapOrderStatus } from '../utils';

dayjs.extend(utc);
dayjs.extend(timezone);

const PAGE_SIZE = 20;

export default function OrderList() {
  const t = useTranslations('ordering');
  const tz = dayjs.tz.guess();

  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.length === 0) return null;

      // key: [resource, currentPage]
      return ['my-orders', pageIndex + 1];
    },
    async ([, size]) => {
      return fetchMyOrders({
        p_limit: PAGE_SIZE,
        p_page: size,
        p_tz: tz,
        p_type: 'normal_items',
        p_status: null,
        p_sort_by: 'created_at',
        p_sort_dir: 'desc',
      });
    }
  );

  const orders = data ? data.flat() : [];
  const totalPages = orders.length > 0 ? orders[0]?.total_pages : 0;

  const groupedOrders = orders?.length > 0 ? orders[0]?.groups : [];

  const handleCancelReception = (goodId: string) => {
    console.log('cancel reception', goodId);
  };

  const handleRenderButtonsByStatus = (status: string, id: string) => {
    switch (status) {
      case 'pending':
        return '';
      case 'paid':
        return (
          <Button
            className="!w-fit max-w-full"
            variant="secondary"
            onClick={() => handleCancelReception(id || '')}
          >
            {t('cancel_reception_btn')}
          </Button>
        );
      case 'shipping':
        return (
          <div className="flex items-center justify-between gap-12">
            <Button
              className="max-w-full"
              variant="secondary"
              onClick={() => handleCancelReception(id || '')}
            >
              {t('refund_request_btn')}
            </Button>
            <Button
              className="max-w-full"
              variant="secondary"
              onClick={() => handleCancelReception(id || '')}
            >
              {t('exchange_request_btn')}
            </Button>
            <Button
              className="max-w-full"
              variant="primary"
              onClick={() => handleCancelReception(id || '')}
            >
              {t('delivery_tracking_btn')}
            </Button>
          </div>
        );
      case 'completed':
        return '';
      case 'cancelled':
        return '';
      case 'refunded':
        return '';
      default:
        return '';
    }
  };

  return (
    <>
      {isLoading && (
        <div className="flex h-full items-center justify-center bg-white">
          <Loading />
        </div>
      )}
      {orders?.length > 0 && (
        <InfiniteScroll
          dataLength={groupedOrders.length || 0}
          next={() => {
            console.log('next');
            setSize(size + 1);
          }}
          loader={<Loading />}
          hasMore={size * PAGE_SIZE < totalPages}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={groupedOrders || []}
            renderItem={(item: MyOrdersGroupedItemType, index: number) => (
              <div key={index} className="flex flex-col gap-8 bg-white">
                <h3 className="truncate border-b border-gray-80 px-16 py-8 text-16 font-semibold text-gray-30">
                  {formatDateByLocale(item.day, item.month, item.year)}
                </h3>
                {item?.orders?.map((order: OrderResponseType) => (
                  <React.Fragment key={order.id}>
                    <div className="flex items-center justify-between px-16 py-8 text-14 text-gray-30">
                      <div className="max-w-[70%] truncate">
                        {t('order_number')}: {order.id}
                      </div>
                      <Link
                        className="flex items-center gap-4"
                        href={`/ordering/${order.id}`}
                        onClick={() => {
                          NProgress.start();
                        }}
                      >
                        <span>{t('view_detail_btn')}</span>
                        <ArrowRight className="h-18 w-18" />
                      </Link>
                    </div>
                    {order?.items?.length > 0 && (
                      <ProductInformation
                        key={`${order?.id}-good`}
                        className="!gap-0 !py-0"
                        items={mappedCartItems(
                          order.items || [],
                          false,
                          true,
                          false
                        ).map(item => ({
                          ...item,
                          orderStatus: mapOrderStatus(order.status, t),
                          shippingFee: '',
                          children: handleRenderButtonsByStatus(
                            order.status,
                            order.id
                          ),
                        }))}
                        title={''}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          />
        </InfiniteScroll>
      )}
    </>
  );
}
