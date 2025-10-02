import { createBrowserSupabase } from '../factory';
import { CartItemType } from './cart';

export const ORDER_KEY = {
  all: ['order'] as const,
};

// Create Order
type ShippingAddressType = {
  receiver_name: string;
  phone_number: string;
  email: string;
  address: string;
  detailed_address: string;
  postal_code?: string;
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
    detailed_address: string;
    note: string;
    is_default: boolean;
    postal_code?: string;
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
  reserve_order_id?: string;
};

const createOrder = async (payload: CreateOrderPayload) => {
  const supabase = createBrowserSupabase('user');
  const { data, error } = await supabase.functions.invoke('orders/create', {
    body: payload,
  });
  if (error) throw error;
  return data as CreateOrderResponseType;
};

// Get Order By Id
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
    phone_number: string;
    receiver_name: string;
    detailed_address: string;
    postal_code?: string;
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

// Get My Orders Grouped By Day
type MyOrdersPayloadType = {
  p_limit: number;
  p_page: number;
  p_tz: string; // must be a valid IANA timezone 'Asia/Seoul',
  p_type: 'normal_items' | 'purchase_coins' | null; // 'normal_items' | 'purchase_coins' | null(all)
  p_status:
    | 'pending'
    | 'paid'
    | 'shipping'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | null; // 'pending' | 'paid' | 'shipping' | 'completed' | 'cancelled' | 'refunded' | null(all)
  p_sort_by: 'created_at' | 'updated_at' | 'total' | 'total_items' | 'paid_at'; // 'created_at' | 'updated_at' | 'total' | 'total_items' | 'paid_at'
  p_sort_dir: 'asc' | 'desc';
};

type MyOrdersGroupedItemType = {
  day: number;
  year: number;
  month: number;
  orders: OrderResponseType[];
};

type MyOrdersGroupedByDayResponseType = {
  current_page: number;
  groups: MyOrdersGroupedItemType[];
  limit: number;
  total: number;
  total_pages: number;
};

const fetchMyOrders = async (params: MyOrdersPayloadType) => {
  const supabase = createBrowserSupabase('user');
  const { data, error } = await supabase.rpc(
    'get_my_orders_grouped_by_day',
    params
  );
  if (error) throw error;
  return data as MyOrdersGroupedByDayResponseType[];
};

// Reserve Order
type ReserveOrderPayloadType = {
  items: CartItemType[];
  expirationMs?: number;
};

const reserveOrder = async (payload: ReserveOrderPayloadType) => {
  const supabase = createBrowserSupabase('user');
  const expirationMs = payload.expirationMs || 10 * 60 * 1000; // 10 minutes

  const { data: reservationResult, error: reservationError } =
    await supabase.rpc('reserve_order', {
      p_expire_at: new Date(Date.now() + expirationMs).toISOString(),
      p_items: payload.items, // see item schema below
    });
  if (reservationError) throw reservationError;
  return reservationResult;
};

export { createOrder, fetchOrderById, fetchMyOrders, reserveOrder };
export type {
  CreateOrderPayload,
  OrderResponseType,
  CreateOrderResponseType,
  ShippingAddressType,
  MyOrdersPayloadType,
  MyOrdersGroupedByDayResponseType,
  MyOrdersGroupedItemType,
};
