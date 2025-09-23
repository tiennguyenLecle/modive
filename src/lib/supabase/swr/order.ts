import { createBrowserSupabase } from '../factory';
import { CartItemType } from './cart';

export const ORDER_KEY = {
  all: ['order'] as const,
};

type ShippingAddressType = {
  receiver_name: string;
  phone_number: string;
  email: string;
  address: string;
  postal_code: string;
  note?: string;
};

type CreateOrderResponseType = {
  id: string;
  user_id: string;
  status: string;
  confirmed_at: string;
  paid_at: string | null;
  refunded_at: string | null;
  currency: string;
  total_delivery_fee: string;
  total_items: number;
  total_price: string;
  total: string;
  shipping_info: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user_id: string;
    receiver_name: string;
    phone_number: string;
    email: string;
    address: string;
    postal_code: string;
    note: string;
    is_default: boolean;
  };
  payment_method: string;
};

type CreateOrderPayload = {
  items: CartItemType[];
  shipping_info: {
    address_id?: string;
    address: ShippingAddressType;
  };
  payment_method: string;
};

const createOrder = async (payload: CreateOrderPayload) => {
  const supabase = createBrowserSupabase('user');
  const { data, error } = await supabase.functions.invoke('orders/create', {
    body: payload,
  });
  if (error) throw error;
  return data as CreateOrderResponseType;
};

type OrderResponseType = CreateOrderResponseType & {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user_id: string;
  status: string;
  total_items: number;
  total_price: number;
  paid_at: string | null;
  confirmed_at: string;
  refunded_at: string | null;
  currency: string;
  total_delivery_fee: number;
  total: number;
  toss_payment_id: string;
  shipping_info: {
    id: string;
    note: string;
    email: string;
    address: string;
    user_id: string;
    created_at: string;
    deleted_at: string | null;
    is_default: boolean;
    updated_at: string;
    postal_code: string;
    phone_number: string;
    receiver_name: string;
  };
  payment_method: string;
  items: CartItemType[];
};

const fetchOrderById = async (orderId: string) => {
  const supabase = createBrowserSupabase('user');
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
          *,
          items:order_items (
            *,
            good:goods (*),
            work:works (*),
            episode:episodes (*),
            chapter:chapters (*)
          )
          `
    )
    .eq('id', orderId)
    .is('deleted_at', null)
    .single();

  if (error) throw error;
  return data as OrderResponseType;
};

export { createOrder, fetchOrderById };
export type {
  CreateOrderPayload,
  OrderResponseType,
  CreateOrderResponseType,
  ShippingAddressType,
};
