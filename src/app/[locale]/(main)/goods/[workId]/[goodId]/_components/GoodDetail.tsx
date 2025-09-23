'use client';

import React, { useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import useSWRMutation from 'swr/mutation';

import ChangeQuantity from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/ChangeQuantity';
import AlertSignUpModal from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/modals/AlertSignUp';
import CompleteShoppingCartModal from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/modals/CompleteShoppingCart';
import DetailTab from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/tabs/DetailTab';
import PurchaseInfoTab from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/tabs/PurchaseInfoTab';
import { AddCart, Heart, Info } from '@/assets/icons';
import { Button, MenuTab } from '@/components';
import { useHashRoute } from '@/hooks/useHashRoute';
import { useAuth } from '@/lib/authentication/auth-context';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { getMyCart, updateMyCart } from '@/lib/supabase/swr/cart';
import { GoodType } from '@/types/goods';
import { cx } from '@/utils/method';

type Props = {
  goodDetail: GoodType & { is_liked: boolean };
  workId: string;
};

const GoodDetail = ({ goodDetail, workId }: Props) => {
  const { user } = useAuth();
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  const [activeTab, setActiveTab] = useHashRoute('detail');
  const [quantity, setQuantity] = React.useState(1);
  const { delivery_fee, free_shipping_threshold, price, id } = goodDetail;
  const addToCart = useSWRMutation(
    'addToCart',
    async () => {
      if (!user?.id) return;

      const cart = await getMyCart(supabase, user?.id);

      const totalPrice = price * quantity;
      const deliveryFee =
        free_shipping_threshold && totalPrice > free_shipping_threshold
          ? 0
          : delivery_fee;

      const newItem = {
        cart_id: cart.id,
        item_type: 'good',
        good_id: id,
        quantity,
        unit_price: price,
        delivery_fee: deliveryFee,
        total_price: totalPrice,
        free_shipping_threshold: free_shipping_threshold,
        is_selected: true,
      };
      const newCartItems = [{ ...newItem }, ...cart.items];
      await updateMyCart(supabase, newCartItems);
    },
    {
      onSuccess: () => {
        completeShoppingCartModalRef.current?.open();
      },
    }
  );

  const t = useTranslations('goods_page.good_detail');

  const completeShoppingCartModalRef =
    useRef<React.ElementRef<typeof CompleteShoppingCartModal>>(null);

  const alertSignUpModalRef =
    useRef<React.ElementRef<typeof AlertSignUpModal>>(null);

  const itemDeliveryFee = useMemo(() => {
    const subtotal = goodDetail.price * quantity;

    if (subtotal > (goodDetail?.free_shipping_threshold ?? Infinity)) {
      return 0;
    }

    return goodDetail?.delivery_fee ?? 0;
  }, [goodDetail, quantity]);

  return (
    <>
      <div className="flex flex-col gap-16 p-16">
        <div className="flex w-full items-start justify-between gap-8 py-8">
          <h1 className="text-16 font-semibold -tracking-0.6 text-gray-00">
            {goodDetail.title}
          </h1>
          <Heart
            className={cx(
              'shrink-0',
              goodDetail.is_liked
                ? 'stroke-primary text-primary'
                : 'stroke-gray-30 text-white'
            )}
            width={32}
            height={32}
          />
        </div>
        <div className="flex w-full items-start justify-between">
          <span className="h-28 whitespace-nowrap text-16 font-semibold leading-1.7 -tracking-0.096 text-gray-00">
            {t('price', {
              price: goodDetail.price?.toLocaleString(),
            })}
          </span>
          <div className="flex flex-row-reverse flex-wrap items-center gap-12">
            <ChangeQuantity
              defaultValue={quantity}
              onChange={val => setQuantity(val)}
              max={goodDetail.quantity ?? Infinity}
            />
            <span className="text-12 font-normal text-primary">
              {t('remaining_quantity', {
                quantity: goodDetail.quantity,
              })}
            </span>
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

        {goodDetail.is_pre_sale && (
          <div className="flex-start mt-16 flex gap-4 rounded-4 border border-gray-80 bg-gray-90 px-8 py-12">
            <Info className="text-gray-60" width={18} height={18} />
            <p className="">
              {t('pre_sale_badge')}
              <br />
              {t('pre_sale_description', {
                release_date: dayjs(goodDetail.release_date).format(
                  'MMMM D, YYYY'
                ),
              })}
            </p>
          </div>
        )}
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
            children: <DetailTab good={goodDetail} />,
          },
          {
            key: 'purchase_info',
            label: t('tabs.purchase_info.title'),
            children: <PurchaseInfoTab />,
          },
        ]}
        activeTab={activeTab}
      />

      <div className="sticky bottom-0 z-10 flex gap-12 bg-white p-16">
        <Button
          variant="secondary"
          className="h-48 !w-48"
          onClick={() => {
            addToCart.trigger();
          }}
          loading={addToCart.isMutating}
          disabled={addToCart.isMutating}
        >
          <AddCart width={24} height={24} />
        </Button>

        <Button
          variant="primary"
          className="h-48"
          onClick={() => {
            if (!user) {
              alertSignUpModalRef.current?.open();
            }
          }}
          disabled={addToCart.isMutating}
        >
          {t('purchase_button')}
        </Button>
      </div>

      <CompleteShoppingCartModal ref={completeShoppingCartModalRef} />
      <AlertSignUpModal ref={alertSignUpModalRef} />
    </>
  );
};

export default GoodDetail;
