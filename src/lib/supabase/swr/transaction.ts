import { SupabaseClient } from '@supabase/supabase-js';

export type TransactionListQuery = {};

export async function fetchTransactions(
  supabase: SupabaseClient,
  query: TransactionListQuery
) {}
