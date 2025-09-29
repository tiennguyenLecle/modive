'use client';

import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useSetAtom } from 'jotai';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';

import CompleteShoppingCartModal from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/modals/CompleteShoppingCart';
import { myCartAtom } from '@/atoms/goodsAtom';
import { useGoodDetail, useGoodLike } from '@/hooks/useGoods';
import { useAuth } from '@/lib/authentication/auth-context';
import { useRouter } from '@/lib/navigation';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { getMyCart, updateMyCart } from '@/lib/supabase/swr/cart';
import { ROUTES } from '@/utils/constants';

import ModalScheduledProduct from '../_components/modals/ModalScheduledProduct.client';

type GoodDetailProviderProps = {
  goodId: string;
  children: React.ReactNode;
};

type GoodDetailContextType = {
  goodDetail: ReturnType<typeof useGoodDetail>;
  addToCart: SWRMutationResponse<void, any, 'addToCart', never>;
  purchaseNow: SWRMutationResponse<void, any, 'purchaseNow', never>;
  toggleGoodLike: ReturnType<typeof useGoodLike>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  checkScheduledProduct: () => Promise<void> | undefined;
};

export const GoodDetailContext = createContext<GoodDetailContextType | null>(
  null
);

export const GoodDetailProvider = ({
  children,
  goodId,
}: GoodDetailProviderProps) => {
  const router = useRouter();
  const setMyCartValue = useSetAtom(myCartAtom);
  const { user } = useAuth();
  const [quantity, setQuantity] = React.useState(1);
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  const goodDetail = useGoodDetail(supabase, goodId);
  const good = goodDetail.data;

  const completeShoppingCartModalRef =
    useRef<React.ElementRef<typeof CompleteShoppingCartModal>>(null);
  const modalScheduledProductRef =
    useRef<React.ElementRef<typeof ModalScheduledProduct>>(null);

  const addToCart = useSWRMutation(
    'addToCart',
    async () => {
      if (!user?.id || !good?.id || !good.quantity) return;
      const cart = await getMyCart(supabase, user?.id);

      const newItem = {
        cart_id: cart.id,
        item_type: 'good',
        good_id: good.id,
        quantity,
        is_selected: false,
      };

      const existingIndex = cart.items.findIndex(
        (item: any) => item.good_id === newItem.good_id
      );

      let newCartItems;
      if (existingIndex !== -1) {
        newCartItems = [
          {
            ...cart.items[existingIndex],
            quantity: Math.min(
              cart.items[existingIndex].quantity + newItem.quantity + 2000,
              good.quantity
            ),
          },
          ...cart.items.slice(0, existingIndex),
          ...cart.items.slice(existingIndex + 1),
        ];
      } else {
        newCartItems = [newItem, ...cart.items];
      }
      await updateMyCart(supabase, newCartItems);
    },
    {
      onSuccess: () => {
        completeShoppingCartModalRef.current?.open();
      },
    }
  );

  const purchaseNow = useSWRMutation('purchaseNow', async () => {
    if (!user?.id || !good?.id) return;

    const cart = await getMyCart(supabase, user?.id);

    setMyCartValue({
      ...cart,
      items: [
        {
          cart_id: cart.id,
          item_type: 'good',
          good_id: good.id,
          quantity,
          is_selected: true,
          good: good,
        },
      ],
    });
    router.push(ROUTES.ORDERING);
  });

  const toggleGoodLike = useGoodLike(supabase, user?.id || '');

  const checkScheduledProduct = () => modalScheduledProductRef.current?.open();

  return (
    <GoodDetailContext.Provider
      value={{
        goodDetail,
        addToCart,
        purchaseNow,
        toggleGoodLike,
        quantity,
        setQuantity,
        checkScheduledProduct,
      }}
    >
      {children}
      <CompleteShoppingCartModal ref={completeShoppingCartModalRef} />
      <ModalScheduledProduct ref={modalScheduledProductRef} />
    </GoodDetailContext.Provider>
  );
};

export const useGoodDetailProvider = () => {
  const context = useContext(GoodDetailContext);
  if (!context) {
    throw new Error(
      'useGoodDetailProvider must be used within a GoodDetailProvider'
    );
  }
  return context;
};
