import { SupabaseClient } from '@supabase/supabase-js';

import { CartItem } from '@/types/cart';

export const getMyCart = async (supabase: SupabaseClient, userId: string) => {
  const { data, error } = await supabase.rpc('get_my_cart', {});
  if (error) throw error;
  return data;
};

export const updateMyCart = async (
  supabase: SupabaseClient,
  items: CartItem[]
) => {
  const totalItems = items.reduce((acc, item) => acc + (item.quantity ?? 0), 0);
  const totalDeliveryFee = items.reduce(
    (acc, item) => acc + (item.delivery_fee ?? 0),
    0
  );
  const total = items.reduce((acc, item) => acc + (item.total_price ?? 0), 0);
  const { data, error } = await supabase.rpc('update_my_cart', {
    p_payload: {
      items,
      total_items: totalItems,
      total_delivery_fee: totalDeliveryFee,
      total: total,
    },
  });

  if (error) throw error;
  return data;
};
