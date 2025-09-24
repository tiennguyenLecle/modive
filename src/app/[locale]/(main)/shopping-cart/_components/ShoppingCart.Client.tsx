'use client';

import { useEffect, useMemo, useState } from 'react';
import { notification } from 'antd';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import { ArrowRight, Info } from '@/assets/icons';
import { myCartAtom } from '@/atoms/goodsAtom';
import Button from '@/components/Button';
import CheckboxComponent from '@/components/Checkbox';
import Empty from '@/components/Empty';
import { useRouter } from '@/lib/navigation';
import {
  CART_KEY,
  CartItemType,
  fetchMyCart,
  updateMyCartByBrowser,
} from '@/lib/supabase/swr/cart';
import { ROUTES } from '@/utils/constants';

import { ItemListBlock } from './ItemList.Client';
import PaymentInfo from './PaymentInfo.Client';
import { mappedCartItems } from './utils';

export default function ShoppingCart() {
  const router = useRouter();
  const t = useTranslations('shopping_cart');
  const [isFullSelected, setIsFullSelected] = useState(false);
  const [myCartValue, setMyCartValue] = useAtom(myCartAtom);
  const [isLoadingSelectionOrder, setIsLoadingSelectionOrder] = useState(false);
  const [isLoadingFullOrder, setIsLoadingFullOrder] = useState(false);

  const { data, error } = useSWR(CART_KEY.all, fetchMyCart, {
    revalidateOnFocus: false,
  });

  const myCart = useMemo(() => data || null, [data]);

  useEffect(() => {
    setMyCartValue(myCart);
  }, [myCart, setMyCartValue]);

  useEffect(() => {
    setIsFullSelected(
      myCartValue?.items?.every((item: CartItemType) => item.is_selected) ||
        false
    );
  }, [myCartValue]);

  if (error) {
    notification.error({
      message: '장바구니 데이터를 불러오는데 실패했습니다.',
    });
    return null;
  }

  if (!myCartValue) return null;

  const myGoods = myCartValue?.items || []; // need to filter good items if apply work, chapter, episode...

  const myGoodsByMoitDelivery = myGoods.filter(
    (item: CartItemType) => item.good.shipping_provider === 'modive'
  );

  const myGoodsByGeneralDelivery = myGoods.filter(
    (item: CartItemType) => item.good.shipping_provider === 'external'
  );

  const myGoodsBySelected = myGoods.filter(
    (item: CartItemType) => item.is_selected
  );

  const productAmount = myGoodsBySelected.reduce(
    (acc: number, item: CartItemType) => acc + item.good.price * item.quantity,
    0
  );

  const deliveryFee = myGoodsBySelected.reduce(
    (acc: number, item: CartItemType) =>
      acc +
      (item.good.price * item.quantity > item.good.free_shipping_threshold
        ? 0
        : item.good.delivery_fee),
    0
  );

  const paymentAmount = productAmount + deliveryFee;

  const onCheckboxChange = (id: string) => {
    setMyCartValue({
      ...myCartValue,
      items: myCartValue?.items?.map(item =>
        item.id === id ? { ...item, is_selected: !item.is_selected } : item
      ),
    });
  };
  const onCountChange = (count: number, id: string) => {
    setMyCartValue({
      ...myCartValue,
      items: myCartValue?.items?.map(item =>
        item.id === id ? { ...item, quantity: count } : item
      ),
    });
  };

  const handleSelectionOrder = () => {
    setIsLoadingSelectionOrder(true);
    const selectedItems = myCartValue?.items?.filter(
      (item: CartItemType) => item.is_selected
    );

    // updateMyCartByBrowser({
    //   items: selectedItems ?? [],
    //   total_items: null,
    //   total_delivery_fee: null,
    //   total: null,
    // });
    setMyCartValue({
      ...myCartValue,
      items: selectedItems ?? [],
    });
    router.push(ROUTES.ORDERING);
  };

  const handleFullOrder = () => {
    setIsLoadingFullOrder(true);
    setMyCartValue({
      ...myCartValue,
      items: myCartValue?.items?.map(item => ({ ...item, is_selected: true })),
    });
    // updateMyCartByBrowser({
    //   items: myCartValue?.items?.map(item => ({ ...item, is_selected: true })),
    //   total_items: null,
    //   total_delivery_fee: null,
    //   total: null,
    // });
    router.push(ROUTES.ORDERING);
  };

  return (
    <>
      <div className="container flex h-56 items-center gap-12 border-b border-t border-gray-80">
        <button
          className="rounded-full h-24 w-24 bg-gray-100"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowRight className="rotate-180" />
        </button>
        <h1 className="flex-1 pr-36 text-center text-16 font-bold">
          {t('shopping_cart')}
        </h1>
      </div>
      {myCart && myCart?.items?.length > 0 ? (
        <div className="relative flex max-h-[calc(100dvh-56rem)] flex-col gap-8 overflow-y-auto overflow-x-hidden bg-gray-90">
          <div>
            <div className="flex flex-row items-center justify-between px-16 py-8 text-14 font-normal text-gray-00">
              <div className="flex flex-row items-center justify-between gap-8">
                <CheckboxComponent
                  checked={isFullSelected}
                  disabled={true}
                  className="h-20 min-w-20"
                />
                <strong>{t('full_choice')}</strong>
                <span className="h-8 w-1 bg-gray-70" />
                {t('total', { count: myGoodsBySelected?.length ?? 0 })}
              </div>
              <Button
                variant="secondary"
                className="w-auto max-w-100"
                onClick={() => {
                  const unSelectedItems = myCartValue.items.filter(
                    (item: CartItemType) => !item.is_selected
                  );
                  setMyCartValue({
                    ...myCartValue,
                    items: unSelectedItems,
                  });
                  updateMyCartByBrowser({
                    items: unSelectedItems ?? [],
                    total_items: null,
                    total_delivery_fee: null,
                    total: null,
                  });
                }}
              >
                {t('selection_deletion_btn')}
              </Button>
            </div>
            {myGoodsByMoitDelivery?.length > 0 && (
              <ItemListBlock
                isActive={true}
                orderListByType={mappedCartItems(myGoodsByMoitDelivery)}
                title={t('moit_delivery')}
                onCheckboxChange={onCheckboxChange}
                onCountChange={onCountChange}
              />
            )}
            {myGoodsByGeneralDelivery?.length > 0 && (
              <ItemListBlock
                isActive={false}
                orderListByType={mappedCartItems(myGoodsByGeneralDelivery)}
                title={t('general_delivery')}
                onCheckboxChange={onCheckboxChange}
                onCountChange={onCountChange}
              />
            )}
          </div>

          <PaymentInfo
            paymentAmount={paymentAmount}
            productAmount={productAmount}
            deliveryFee={deliveryFee}
          />

          <div className="bg-white">
            <span className="flex flex-row items-center gap-8 px-16 py-12 text-12 font-normal text-gray-50">
              <Info className="h-18 w-18" color="gray-60" /> {t('info_notice')}
            </span>
            <div className="flex flex-row items-center justify-between gap-12 p-16">
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleSelectionOrder}
                disabled={myGoodsBySelected.length === 0}
                loading={isLoadingSelectionOrder}
              >
                {t('selection_order_btn')}
              </Button>
              <Button
                variant="primary"
                className="w-full"
                onClick={handleFullOrder}
                disabled={myGoods.length === 0}
                loading={isLoadingFullOrder}
              >
                {t('full_order_btn')}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
}
