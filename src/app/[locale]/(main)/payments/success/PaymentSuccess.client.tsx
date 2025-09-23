'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import useSWRMutation from 'swr/mutation';

import { Button } from '@/components';
import { useAuth } from '@/lib/authentication/auth-context';
import { useRouter } from '@/lib/navigation';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { increaseCash } from '@/lib/supabase/swr/users';
import { STORAGE } from '@/utils/constants';

export default function PaymentSuccessClient({ amount }: { amount: number }) {
  const t = useTranslations('payments.success');
  const router = useRouter();
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  const { user } = useAuth();
  const updateCash = useSWRMutation(
    'increaseCash',
    async () => {
      if (!user?.id) return;
      await increaseCash(supabase, user?.id, amount);
    },
    {
      onSuccess: () => {
        const paymentSuccessCallback = sessionStorage.getItem(
          STORAGE.PAYMENT_SUCCESS_CALLBACK
        );
        if (paymentSuccessCallback) {
          router.push(paymentSuccessCallback);
          sessionStorage.removeItem(STORAGE.PAYMENT_SUCCESS_CALLBACK);
        }
      },
      onError: error => {
        console.log(error);
      },
    }
  );

  return (
    <Button
      variant="primary"
      className="flex-1"
      onClick={() => updateCash.trigger()}
      loading={updateCash.isMutating}
    >
      {t('button.check')}
    </Button>
  );
}
