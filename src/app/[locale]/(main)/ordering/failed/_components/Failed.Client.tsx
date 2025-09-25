'use client';

import { Result } from 'antd';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';
import { useRouter } from '@/lib/navigation';
import { ROUTES } from '@/utils/constants';

export default function FailPage({ messageError }: { messageError: string }) {
  const t = useTranslations('ordering');
  const router = useRouter();
  return (
    <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
      <Result
        status="404"
        title={
          <h3 className="text-22 font-semibold">
            {messageError || t('order_failed')}
          </h3>
        }
        extra={
          <Button
            variant="primary"
            onClick={() => router.push(ROUTES.GOODS)}
            className="mt-16 p-24 underline"
          >
            {t('back_to_goods')}
          </Button>
        }
      />
    </div>
  );
}
