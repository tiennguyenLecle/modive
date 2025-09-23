import { SupabaseClient } from '@supabase/supabase-js';

import { CartItem } from '@/types/cart';

import { createBrowserSupabase } from '../factory';

export const CART_KEY = {
  all: ['cart'] as const,
};

type CartItemType = {
  id: string;
  work?: any;
  good: GoodType;
  item_snapshot?: GoodType;
  cart_id: string;
  chapter?: string | any;
  episode?: null | any;
  good_id: string;
  item_id: string;
  user_id: string;
  work_id?: string | null;
  currency: string;
  quantity: number;
  item_type: string;
  chapter_id?: string | null;
  created_at: string;
  deleted_at?: string | null;
  episode_id?: string | null;
  unit_price: number;
  updated_at: string;
  is_selected: boolean;
  total_price: number;
  delivery_fee: number;
};

type GoodType = {
  id: string;
  url: null;
  price: number;
  title: string;
  status: string;
  work_id: string;
  currency: string;
  metadata: Record<string, any>;
  quantity: number;
  created_at: string;
  deleted_at: string | null;
  updated_at: string;
  description: string;
  is_pre_sale: boolean;
  delivery_fee: number;
  release_date: string | null;
  thumbnail_id: null;
  purchase_link: string;
  thumbnail_key: string;
  shipping_provider: string;
  free_shipping_threshold: number;
};

type MyCartResponseType = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user_id: string;
  total_items: number;
  total: number;
  currency: string;
  total_delivery_fee: number;
  items: CartItemType[];
};

type UpdateMyCartPayload = {
  total_items: number | null;
  total_delivery_fee: number | null;
  items: CartItemType[];
  total: number | null;
};

const fetchMyCart = async () => {
  const supabase = createBrowserSupabase('user');
  const { data, error } = await supabase.rpc('get_my_cart');
  if (error) throw error;
  return data;
};

const updateMyCartByBrowser = async (payload: UpdateMyCartPayload) => {
  // Only include fields with meaningful data
  const supabase = createBrowserSupabase('user');
  const body = Object.fromEntries(
    Object.entries({ ...payload }).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        !(Array.isArray(value) && value.length === 0)
    )
  );

  const { data: res, error } = await supabase.rpc('update_my_cart', {
    p_payload: {
      ...body,
    },
  });
  if (error) throw error;
  return res;
};

export const getMyCart = async (supabase: SupabaseClient, userId: string) => {
  const { data, error } = await supabase.rpc('get_my_cart', {});
  if (error) throw error;
  return data;
};

const updateMyCart = async (supabase: SupabaseClient, items: CartItem[]) => {
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

export { fetchMyCart, updateMyCart, updateMyCartByBrowser };
export type { MyCartResponseType, CartItemType, GoodType };
