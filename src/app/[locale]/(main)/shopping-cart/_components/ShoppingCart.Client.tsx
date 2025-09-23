'use client';

import { useEffect, useMemo, useState } from 'react';
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
  const [totalCount, setTotalCount] = useState(0);
  const [isFullSelected, setIsFullSelected] = useState(false);

  const { data } = useSWR(CART_KEY.all, fetchMyCart);
  const myCart = useMemo(() => data || null, [data]);

  const [myCartValue, setMyCartValue] = useAtom(myCartAtom);
  const [isLoadingSelectionOrder, setIsLoadingSelectionOrder] = useState(false);
  const [isLoadingFullOrder, setIsLoadingFullOrder] = useState(false);

  // Update atom only when myCart data actually changes
  // useEffect(() => {
  //   updateMyCartByBrowser({
  //     items: [
  //       {
  //         "id": "5aa69242-3b9c-4b78-b2b0-9b7cb4f50b7c",
  //         "work": null,
  //         "good": {
  //           "id": "2b3242c2-36fe-4699-8519-399d33859f99",
  //           "url": null,
  //           "price": 30000,
  //           "title": "New Good",
  //           "status": "published",
  //           "work_id": "5d0125d3-3f53-4fa1-9223-1c1eeb8a3651",
  //           "currency": "krw",
  //           "metadata": {},
  //           "quantity": 3,
  //           "created_at": "2025-09-10T15:26:17.61895+00:00",
  //           "deleted_at": null,
  //           "updated_at": "2025-09-10T15:26:17.61895+00:00",
  //           "description": "Description",
  //           "is_pre_sale": false,
  //           "delivery_fee": 0,
  //           "release_date": null,
  //           "thumbnail_id": null,
  //           "purchase_link": "google.com",
  //           "thumbnail_key": "",
  //           "shipping_provider": "modive",
  //           "free_shipping_threshold": 60000
  //         },
  //         "cart_id": "7e638541-df9a-4f48-a058-cf201b2f1d61",
  //         "chapter": null,
  //         "episode": null,
  //         "good_id": "2b3242c2-36fe-4699-8519-399d33859f99",
  //         "item_id": "good:2b3242c2-36fe-4699-8519-399d33859f99",
  //         "user_id": "709e3d21-c81a-45f5-8516-bc185d6f6c81",
  //         "work_id": null,
  //         "currency": "krw",
  //         "quantity": 1,
  //         "item_type": "good",
  //         "chapter_id": null,
  //         "created_at": "2025-09-19T09:17:40.878365+00:00",
  //         "deleted_at": null,
  //         "episode_id": null,
  //         "unit_price": 30000,
  //         "updated_at": "2025-09-19T09:17:40.878365+00:00",
  //         "is_selected": true,
  //         "total_price": 30000,
  //         "delivery_fee": 0
  //       }

  //     ],
  //     total_items: 1,
  //     total_delivery_fee: 0,
  //     total: 30000,
  //   });
  // }, []);
  useEffect(() => {
    setMyCartValue(myCart);
  }, [myCart, setMyCartValue]);

  useEffect(() => {
    setIsFullSelected(
      myCartValue?.items?.every((item: CartItemType) => item.is_selected) ||
        false
    );
  }, [myCartValue]);

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

    updateMyCartByBrowser({
      items: selectedItems ?? [],
      total_items: null,
      total_delivery_fee: null,
      total: null,
    });
    router.push(ROUTES.ORDERING);
  };

  const handleFullOrder = () => {
    setIsLoadingFullOrder(true);
    setMyCartValue({
      ...myCartValue,
      items: myCartValue?.items?.map(item => ({ ...item, is_selected: true })),
    });
    updateMyCartByBrowser({
      items: myCartValue?.items?.map(item => ({ ...item, is_selected: true })),
      total_items: null,
      total_delivery_fee: null,
      total: null,
    });
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
                {t('total', { count: myGoods?.length ?? 0 })}
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
