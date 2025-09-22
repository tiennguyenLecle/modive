import {
  ANONYMOUS,
  loadTossPayments as loadToss,
} from '@tosspayments/tosspayments-sdk';

export async function loadTossPayments(clientKey: string, customerKey: string) {
  if (typeof window === 'undefined') return null;
  const instance = await loadToss(clientKey);

  const payment = instance.payment({ customerKey });
  return payment;
}

type OpenPaymentParams = {
  amount: number;
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  customerEmail?: string;
  customerName?: string;
};

export async function openCardPayment(params: OpenPaymentParams) {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
  const customerKey = ANONYMOUS;
  if (!clientKey)
    throw new Error('Missing NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY');

  const payment = await loadTossPayments(clientKey, customerKey);
  if (!payment) throw new Error('TossPayments not initialized');

  return payment.requestPayment({
    method: 'CARD',
    amount: {
      currency: 'KRW',
      value: params.amount,
    },
    orderId: params.orderId,
    orderName: params.orderName,
    successUrl: params.successUrl,
    failUrl: params.failUrl,
    customerEmail: params.customerEmail,
    customerName: params.customerName,
    card: {
      useEscrow: false,
      flowMode: 'DEFAULT',
      useCardPoint: false,
      useAppCardOnly: false,
    },
  });
}

export function generateClientOrderId(prefix: string = 'order'): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const ymd = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}-${ymd}-${rand}`;
}
