import { CartItemType } from '@/lib/supabase/swr/cart';

export const useCalcPaymentAmount = (items: CartItemType[]) => {
  if (!items) return { productAmount: 0, deliveryFee: 0, paymentAmount: 0 };

  const productAmount = items?.reduce(
    (acc: number, item: CartItemType) =>
      acc + item?.good?.price * item.quantity,
    0
  );

  // Tính phí vận chuyển cho từng provider
  const modiveDeliveryFees =
    items
      ?.filter(item => item?.good?.shipping_provider === 'modive')
      ?.map(item =>
        item?.good?.free_shipping_threshold &&
        item?.good?.price * item.quantity > item?.good?.free_shipping_threshold
          ? 0
          : item?.good?.delivery_fee
      ) || [];

  const externalDeliveryFees =
    items
      ?.filter(item => item?.good?.shipping_provider === 'external')
      ?.map(item =>
        item?.good?.price * item.quantity > item?.good?.free_shipping_threshold
          ? 0
          : item?.good?.delivery_fee
      ) || [];

  // Lấy phí vận chuyển lớn nhất của mỗi provider
  const maxModiveFee =
    modiveDeliveryFees?.length > 0 ? Math.max(...modiveDeliveryFees) : 0;
  const maxExternalFee =
    externalDeliveryFees?.length > 0 ? Math.max(...externalDeliveryFees) : 0;

  const deliveryFee = maxModiveFee + maxExternalFee;

  const paymentAmount = productAmount + deliveryFee || 0;

  return { productAmount, deliveryFee, paymentAmount };
};
