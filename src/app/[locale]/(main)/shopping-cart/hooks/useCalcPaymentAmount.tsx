import { CartItemType } from '@/lib/supabase/swr/cart';

export const useCalcPaymentAmount = (items: CartItemType[]) => {
  if (!items) return { productAmount: 0, deliveryFee: 0, paymentAmount: 0 };

  const productAmount = items?.reduce(
    (acc: number, item: CartItemType) =>
      acc + item?.good?.price * item.quantity,
    0
  );

  const deliveryFee = items?.reduce(
    (acc: number, item: CartItemType) =>
      acc +
      (item?.good?.price * item.quantity > item?.good?.free_shipping_threshold
        ? 0
        : item?.good?.delivery_fee),
    0
  );

  const paymentAmount = productAmount + deliveryFee || 0;

  return { productAmount, deliveryFee, paymentAmount };
};
