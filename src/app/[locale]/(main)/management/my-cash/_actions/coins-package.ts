'use server';

import { getServerAuth } from '@/lib/authentication/server-auth';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { CoinPackageType } from '@/types/coins-packages';
import { OrderType } from '@/types/order';
import { TransactionType } from '@/types/transaction';

export const fetchCoinsPackage = async () => {
  const supabase = createServerSupabase('user');

  const { data, error } = await supabase
    .from('coin_packages')
    .select()
    .is('deleted_at', null)
    .eq('status', 'active')
    .order('price', { ascending: true });
  if (error) throw error;

  return data as CoinPackageType[];
};

export const fetchPurchaseHistory = async () => {
  const supabase = createServerSupabase('user');
  const user = await getServerAuth();
  if (!user) throw new Error('Authentication required');
  const { data, error } = await supabase
    .from('transactions')
    .select()
    .eq('type', 'payment')
    .eq('content', 'regular_charge')
    .eq('status', 'completed')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  if (error) throw error;
  console.log('data:', data);

  return data as TransactionType[];
};

export const triggerPurchaseCoins = async (coinPackageId: string) => {
  const supabase = createServerSupabase('user');
  const user = await getServerAuth();
  if (!user) throw new Error('Authentication required');
  const { data, error } = await supabase.functions.invoke(
    'orders/purchase-coins',
    {
      body: {
        coin_package_id: '8a1f2d9e-6f1a-4f13-8b77-5b9d3a5b2a11',
      },
    }
  );

  if (error) throw error;
  return data.data as OrderType;
};
