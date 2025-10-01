import { createBrowserSupabase } from '../factory';

export const SHIPPING_KEY = {
  all: ['shipping'] as const,
  lists: () => [...SHIPPING_KEY.all, 'list'] as const,
  list: (filters: string) => [...SHIPPING_KEY.lists(), { filters }] as const,
};

type ShippingAddressType = {
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

type GetShippingAddressListResponseType = ShippingAddressType[];

const getShippingAddressList = async (userId: string) => {
  const supabase = createBrowserSupabase('user');
  const { data, error } = await supabase
    .from('shipping_addresses')
    .select()
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('is_default', { ascending: false });

  return { data, error };
};

export { getShippingAddressList };
export type { ShippingAddressType, GetShippingAddressListResponseType };
