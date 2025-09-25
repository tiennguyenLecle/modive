import { createBrowserSupabase } from '../factory';

export const PAYMENT_KEY = {
  all: ['payment'] as const,
};

type CardInfoType = {
  amount: number;
  number: string;
  card_type: string;
  approve_no: string;
  owner_type: string;
  issuer_code: string;
  acquirer_code: string;
  acquire_status: string;
  interest_payer: string | null;
  use_card_point: boolean;
  is_interest_free: boolean;
  installment_plan_months: number;
};

type ReceiptInfoType = {
  url: string;
};

type CheckoutInfoType = {
  url: string;
};

type RawDataType = {
  vat: number;
  card: CardInfoType;
  receipt: ReceiptInfoType;
  checkout: CheckoutInfoType;
  order_id: string;
  order_name: string;
  status: string;
  total_amount: number;
  balance_amount: number;
  approved_at: string;
  requested_at: string;
  payment_key: string;
  country: string;
  currency: string;
  supplied_amount: number;
  tax_free_amount: number;
  tax_exemption_amount: number;
  is_partial_cancelable: boolean;
};

type ConfirmPaymentPayload = {
  order_id: string;
  payment_key?: string;
  amount?: string;
  code?: string;
  message?: string;
};

type ConfirmPaymentResponseType = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  payment_key: string;
  type: string;
  customer_key: string | null;
  order_id: string;
  order_name: string;
  m_id: string;
  currency: string;
  method: string;
  total_amount: string;
  balance_amount: string;
  status: string;
  requested_at: string;
  approved_at: string;
  last_transaction_key: string | null;
  _v_a_t: string | null;
  metadata: Record<string, any>;
  raw_data: RawDataType;
};

const confirmPayment = async (payload: ConfirmPaymentPayload) => {
  const supabase = createBrowserSupabase('user');
  const { data, error } = await supabase.functions.invoke(
    'payments/toss/confirm',
    {
      body: payload,
    }
  );

  return { data, error };
};

export { confirmPayment };
export type {
  ConfirmPaymentPayload,
  ConfirmPaymentResponseType,
  CardInfoType,
  ReceiptInfoType,
  CheckoutInfoType,
  RawDataType,
};
