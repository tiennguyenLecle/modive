import { atom } from 'jotai';

import { MyCartResponseType } from '@/lib/supabase/swr/cart';

export type CartItemProps = {
  id: string;
  image: string | null;
  title: string;
  price: string | number;
  shippingFee: string | number;
  scheduledDate?: string;
  quantity?: number;
  remainingCount?: number;
  showCheckbox?: boolean;
  checked?: boolean;
  showOrderCount?: boolean;
  showAddItem?: boolean;
  onCheckboxChange?: (id: string) => void;
  onCountChange?: (count: number, id: string) => void;
  children?: React.ReactNode;
  orderStatus?: string;
};

export const shoppingCartAtom = atom<CartItemProps[]>([]);

export const myCartAtom = atom<MyCartResponseType | null>(null);

export const paymentMethodAtom = atom<string | null>(null);

export const isAgreementAtom = atom<boolean>(true);

export const shippingFormAtom = atom<any>(null);

export const paymentWidgetAtom = atom<any>(null);
