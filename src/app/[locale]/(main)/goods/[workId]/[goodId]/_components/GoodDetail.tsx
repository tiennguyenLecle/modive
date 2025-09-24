'use client';

import React, { useMemo, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';

import AlertSignUpModal from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/modals/AlertSignUp';
import CompleteShoppingCartModal from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/modals/CompleteShoppingCart';
import DetailTab from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/tabs/DetailTab';
import PurchaseInfoTab from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/tabs/PurchaseInfoTab';
import { AddCart, Heart } from '@/assets/icons';
import { myCartAtom } from '@/atoms/goodsAtom';
import { Button, ChangeQuantity, MenuTab, PreOrderInfo } from '@/components';
import { useGoodDetail, useGoodLike } from '@/hooks/useGoods';
import { useHashRoute } from '@/hooks/useHashRoute';
import { useAuth } from '@/lib/authentication/auth-context';
import { useRouter } from '@/lib/navigation';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { getMyCart, updateMyCart } from '@/lib/supabase/swr/cart';
import { ROUTES } from '@/utils/constants';
import { cx, getPublicUrl } from '@/utils/method';

type Props = {
  goodId: string;
  workId: string;
};

const GoodDetail = ({ goodId }: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  const [activeTab, setActiveTab] = useHashRoute('detail');
  const [quantity, setQuantity] = React.useState(1);
  const setMyCartValue = useSetAtom(myCartAtom);
  const { data: goodDetail, mutate: mutateGoodDetail } = useGoodDetail(
    supabase,
    goodId
  );

  const { delivery_fee, free_shipping_threshold, price, id } = goodDetail || {};
  const addToCart = useSWRMutation(
    'addToCart',
    async () => {
      if (!user?.id) return;
      const cart = await getMyCart(supabase, user?.id);
      const newItem = {
        cart_id: cart.id,
        item_type: 'good',
        good_id: id,
        quantity,
        is_selected: false,
      };
      const newCartItems = [newItem, ...cart.items];
      await updateMyCart(supabase, newCartItems);
    },
    {
      onSuccess: () => {
        completeShoppingCartModalRef.current?.open();
      },
    }
  );

  const purchaseNow = useSWRMutation('purchaseNow', async () => {
    if (!user?.id) return;

    const cart = await getMyCart(supabase, user?.id);

    setMyCartValue({
      ...cart,
      items: [
        {
          cart_id: cart.id,
          item_type: 'good',
          good_id: id,
          quantity,
          is_selected: true,
          good: goodDetail,
        },
      ],
    });
    router.push(ROUTES.ORDERING);
  });
  const { trigger: toggleGoodLike } = useGoodLike(supabase, user?.id || '');

  const t = useTranslations('goods_page.good_detail');

  const completeShoppingCartModalRef =
    useRef<React.ElementRef<typeof CompleteShoppingCartModal>>(null);

  const alertSignUpModalRef =
    useRef<React.ElementRef<typeof AlertSignUpModal>>(null);

  if (!goodDetail) return null;

  return (
    <>
      <div className="relative aspect-[360/232] w-full">
        <Image
          src={getPublicUrl(goodDetail?.thumbnail_key || '')}
          alt={goodDetail?.title || 'Good Detail'}
          priority
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col gap-16 p-16">
        <div className="flex w-full items-start justify-between gap-8 py-8">
          <h1 className="text-16 font-semibold -tracking-0.6 text-gray-00">
            {goodDetail.title}
          </h1>
          <Heart
            className={cx(
              'shrink-0 cursor-pointer',
              goodDetail.is_liked
                ? 'stroke-primary text-primary'
                : 'stroke-gray-30 text-white'
            )}
            width={32}
            height={32}
            onClick={() => {
              toggleGoodLike({
                isLiked: goodDetail.is_liked,
                goodId: goodDetail.id,
              }).then(() => mutateGoodDetail());
            }}
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

        <PreOrderInfo
          isPreSale={goodDetail.is_pre_sale}
          releaseDate={goodDetail.release_date}
        />
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
          onClick={async () => {
            if (!user) {
              alertSignUpModalRef.current?.open();
            } else {
              await addToCart.trigger();
            }
          }}
          disabled={addToCart.isMutating || purchaseNow.isMutating}
        >
          <AddCart width={24} height={24} />
        </Button>

        <Button
          variant="primary"
          className="h-48"
          onClick={async () => {
            if (!user) {
              alertSignUpModalRef.current?.open();
            } else {
              await purchaseNow.trigger();
            }
          }}
          disabled={addToCart.isMutating || purchaseNow.isMutating}
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
