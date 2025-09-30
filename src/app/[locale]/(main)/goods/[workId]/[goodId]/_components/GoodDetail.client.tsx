'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { AddCart, Heart } from '@/assets/icons';
import { Button, ChangeQuantity, MenuTab, PreOrderInfo } from '@/components';
import { useHashRoute } from '@/hooks/useHashRoute';
import { useAuth } from '@/lib/authentication/auth-context';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { fetchWorkDetail } from '@/lib/supabase/swr/work';
import { getAmplitudeLocationProperties } from '@/utils/amplitude';
import { cx, getPublicUrl } from '@/utils/method';

import { useGoodDetailProvider } from '../_provider/GoodDetailProvider';
import DetailTab from './tabs/DetailTab';
import PurchaseInfoTab from './tabs/PurchaseInfoTab';

const GoodDetail: React.FC = () => {
  const t = useTranslations('goods_page.good_detail');
  const { checkAvailableUser } = useAuth();
  const [activeTab, setActiveTab] = useHashRoute('detail');
  const { workId } = useParams();
  const hasTrackedView = useRef(false);

  const { goodDetail, toggleGoodLike, quantity, setQuantity } =
    useGoodDetailProvider();

  // Amplitude: Track product details viewed event
  useEffect(() => {
    const trackProductDetailsViewed = async () => {
      if (hasTrackedView.current || !goodDetail.data) return;
      hasTrackedView.current = true;

      try {
        // Fetch work information
        const supabase = createBrowserSupabase('user');
        const work = await fetchWorkDetail(supabase, workId as string);

        amplitude.track({
          event_type: 'Product Details Viewed',
          event_properties: {
            program_name: work?.title || '',
            product_id: goodDetail.data.id,
            product_name: goodDetail.data.title,
            ...getAmplitudeLocationProperties(),
          },
        });
      } catch (error) {
        console.error('Failed to track Product Details Viewed event:', error);
      }
    };

    trackProductDetailsViewed();
  }, [goodDetail.data, workId]);

  if (!goodDetail.data) return null;

  const {
    delivery_fee,
    free_shipping_threshold,
    id,
    is_pre_sale,
    release_date,
    title,
    thumbnail_key,
    is_liked,
    price,
    quantity: goodQuantity,
  } = goodDetail.data;

  return (
    <>
      <div className="relative aspect-[360/232] w-full">
        <Image
          src={getPublicUrl(thumbnail_key || '')}
          alt={title || 'Good Detail'}
          priority
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col gap-16 p-16">
        <div className="flex w-full items-start justify-between gap-8 py-8">
          <h1 className="text-16 font-semibold -tracking-0.6 text-gray-00">
            {title}
          </h1>
          <Heart
            className={cx(
              'shrink-0 cursor-pointer',
              is_liked
                ? 'stroke-primary text-primary'
                : 'stroke-gray-30 text-white'
            )}
            width={32}
            height={32}
            onClick={() => {
              checkAvailableUser({
                description: t('alert_sign_up.like'),
              }).then(() => {
                toggleGoodLike
                  .trigger({
                    isLiked: is_liked,
                    goodId: id,
                  })
                  .then(() => goodDetail.mutate());
              });
            }}
          />
        </div>
        <div className="flex w-full items-start justify-between">
          <span className="h-28 whitespace-nowrap text-16 font-semibold leading-1.7 -tracking-0.096 text-gray-00">
            {t('price', {
              price: price?.toLocaleString(),
            })}
          </span>
          <div className="flex flex-row-reverse flex-wrap items-center gap-12">
            <ChangeQuantity
              defaultValue={quantity}
              onChange={val => setQuantity(val)}
              max={goodQuantity || 0}
            />
            {/* <span className="text-12 font-normal text-primary">
              {t('remaining_quantity', {
                quantity: goodQuantity || 0,
              })}
            </span> */}
          </div>
        </div>
      </div>

      <div className="mx-16 h-1 bg-gray-80" />

      <div className="p-16 text-12 font-normal text-gray-00">
        <p className="px-8">
          {delivery_fee === 0
            ? t('free_shipping')
            : t('shipping_cost', { cost: delivery_fee })}
          <br />
          {t('shipping_fee_description', {
            free_shipping_threshold: free_shipping_threshold,
          })}
        </p>

        <PreOrderInfo isPreSale={is_pre_sale} releaseDate={release_date} />
      </div>

      <div className="mx-16 h-1 bg-gray-80" />

      <MenuTab
        onTabChange={key => {
          setActiveTab(key);
        }}
        tabs={[
          {
            key: 'detail',
            label: t('tabs.detail.title'),
          },
          {
            key: 'purchase_info',
            label: t('tabs.purchase_info.title'),
          },
        ]}
        activeTab={activeTab}
        className="sticky top-0 z-50"
      />
      <DetailTab className={cx(activeTab !== 'detail' && 'hidden')} />
      <PurchaseInfoTab
        className={cx(activeTab !== 'purchase_info' && 'hidden')}
      />
      <ActionButtons />
    </>
  );
};

export default GoodDetail;

const ActionButtons: React.FC = () => {
  const t = useTranslations('goods_page.good_detail');
  const { checkAvailableUser } = useAuth();
  const { addToCart, purchaseNow, checkScheduledProduct, goodDetail } =
    useGoodDetailProvider();

  const {
    quantity: goodQuantity,
    release_date,
    is_pre_sale,
  } = goodDetail.data || {};

  const isOutOfStock = useMemo(
    () => !goodQuantity || goodQuantity === 0,
    [goodQuantity]
  );

  const isReadyToSale = useMemo(
    () => release_date === null || dayjs().isAfter(dayjs(release_date)),
    [release_date]
  );

  const isPreSale = useMemo(() => is_pre_sale, [is_pre_sale]);

  const PurchaseButton = useMemo(() => {
    switch (true) {
      case isOutOfStock:
        return (
          <button className="pointer-events-none flex h-48 flex-1 cursor-not-allowed items-center justify-center rounded-4 bg-gray-70 text-white">
            {t('out_of_stock')}
          </button>
        );
      case isPreSale:
        return (
          <Button
            className="flex h-48 w-full items-center justify-center rounded-4 border-2 border-primary bg-white text-16 font-semibold text-primary"
            onClick={() => {
              checkAvailableUser({
                description: t('alert_sign_up.purchase'),
              }).then(() => {
                purchaseNow.trigger();
              });
            }}
            loading={purchaseNow.isMutating}
            disabled={
              goodQuantity === 0 ||
              addToCart.isMutating ||
              purchaseNow.isMutating
            }
          >
            {t('reservation_purchase')}
          </Button>
        );
      case !isReadyToSale: {
        return (
          <Button
            variant="primary"
            className="h-48 bg-secondary transition-colors duration-300 hover:bg-primary"
            onClick={() => {
              checkScheduledProduct();
            }}
          >
            {t('scheduled_to_be_sold')}
          </Button>
        );
      }
      default:
        return (
          <Button
            variant="primary"
            className="h-48"
            onClick={() => {
              checkAvailableUser({
                description: t('alert_sign_up.purchase'),
              }).then(() => {
                purchaseNow.trigger();
              });
            }}
            loading={purchaseNow.isMutating}
            disabled={
              goodQuantity === 0 ||
              addToCart.isMutating ||
              purchaseNow.isMutating
            }
          >
            {t('purchase_button')}
          </Button>
        );
    }
  }, [
    isOutOfStock,
    isReadyToSale,
    isPreSale,
    purchaseNow,
    goodQuantity,
    addToCart.isMutating,
    t,
    checkAvailableUser,
    checkScheduledProduct,
  ]);

  return (
    <div className="sticky bottom-0 z-50 flex gap-12 bg-white p-16">
      <Button
        variant="secondary"
        className="h-48 !w-48 shrink-0 !p-0"
        onClick={() => {
          checkAvailableUser({
            description: t('alert_sign_up.add_to_cart'),
          }).then(() => {
            addToCart.trigger();
          });
        }}
        loading={addToCart.isMutating}
        disabled={
          isOutOfStock || addToCart.isMutating || purchaseNow.isMutating
        }
      >
        {!addToCart.isMutating && <AddCart width={24} height={24} />}
      </Button>
      {PurchaseButton}
    </div>
  );
};
