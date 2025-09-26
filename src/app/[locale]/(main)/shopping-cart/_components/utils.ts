import { CartItemType } from '@/lib/supabase/swr/cart';
import { getPublicUrl } from '@/utils/method';

export const mappedCartItems = (
  items: CartItemType[],
  showCheckbox = true,
  showOrderCount = false,
  showAddItem = true
) => {
  if (!items || items?.length === 0) return [];
  return items.map((item: CartItemType) => {
    const { good, quantity, is_selected, id, item_snapshot } = item || {};

    const goodInfo = good || item_snapshot || {};

    return {
      id,
      image: goodInfo?.thumbnail_key
        ? getPublicUrl(goodInfo?.thumbnail_key)
        : '',
      title: goodInfo?.title,
      price: goodInfo?.price,
      shippingFee: goodInfo?.delivery_fee,
      scheduledDate: goodInfo?.is_pre_sale
        ? (goodInfo?.release_date ?? '')
        : '',
      // need to ask
      quantity: quantity,
      remainingCount: goodInfo?.quantity,
      // need to ask
      showCheckbox: showCheckbox,
      checked: is_selected,
      showOrderCount: showOrderCount,
      showAddItem: showAddItem,
    };
  });
};
