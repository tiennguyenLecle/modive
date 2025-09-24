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
    const { good, quantity, is_selected, id } = item || {};

    return {
      id,
      image: good?.thumbnail_key ? getPublicUrl(good?.thumbnail_key) : '',
      title: good?.title,
      price: good?.price,
      shippingFee: good?.delivery_fee,
      scheduledDate: good?.is_pre_sale ? (good?.release_date ?? '') : '',
      // need to ask
      quantity: quantity,
      remainingCount: good?.quantity,
      // need to ask
      showCheckbox: showCheckbox,
      checked: is_selected,
      showOrderCount: showOrderCount,
      showAddItem: showAddItem,
    };
  });
};
