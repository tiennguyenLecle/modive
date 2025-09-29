'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';

import { createBrowserSupabase } from '@/lib/supabase/factory';
import { openCardPayment } from '@/lib/toss/payments';
import { CoinPackageType } from '@/types/coins-packages';
import { TransactionType } from '@/types/transaction';
import { ROUTES } from '@/utils/constants';

import {
  fetchCoinsPackage,
  fetchPurchaseHistory,
  triggerPurchaseCoins,
} from './_actions/coins-package';

type MyCashContextType = {
  coinPackages: CoinPackageType[] | null;
  purchaseHistory: TransactionType[] | null;
  purchaseCoins: SWRMutationResponse<
    void,
    void,
    string,
    { coinPackageId: string }
  >;
};

const MyCashContext = createContext<MyCashContextType | null>(null);

export const MyCashProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  const locale = useLocale();

  const { mutate } = useSWRConfig();
  const [coinPackages, setCoinPackages] = useState<CoinPackageType[] | null>(
    null
  );

  const [purchaseHistory, setPurchaseHistory] = useState<
    TransactionType[] | null
  >(null);

  useSWR('get-coin-packages', () => fetchCoinsPackage(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: data => {
      setCoinPackages(data);
    },
  });

  useSWR('get-purchase-history', () => fetchPurchaseHistory(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: data => {
      setPurchaseHistory(data);
    },
  });

  const purchaseCoins = useSWRMutation<
    void,
    any,
    string,
    { coinPackageId: string }
  >(
    'get-purchase-coins',
    async (key: string, { arg }: { arg: { coinPackageId: string } }) => {
      const coinPackage = coinPackages?.find(
        coinPackage => coinPackage.id === arg.coinPackageId
      );
      if (!coinPackage) return;
      const { price: amount, name: orderName } = coinPackage;

      const data = await triggerPurchaseCoins(arg.coinPackageId);
      const { id: orderId } = data;

      await openCardPayment({
        amount,
        orderId,
        orderName,
        successUrl: `${window.location.origin}/${locale}/${ROUTES.MANAGEMENT.MY_CASH}/success`,
        failUrl: `${window.location.origin}/${locale}/${ROUTES.MANAGEMENT.MY_CASH}/fail`,
      });
    },
    {
      onSuccess: data => {
        mutate('get-purchase-history');
      },
    }
  );

  return (
    <MyCashContext.Provider
      value={{ coinPackages, purchaseHistory, purchaseCoins }}
    >
      {children}
    </MyCashContext.Provider>
  );
};

export const useMyCash = () => {
  const context = useContext(MyCashContext);
  if (!context) {
    throw new Error('useMyCash must be used within a MyCashProvider');
  }
  return context;
};
