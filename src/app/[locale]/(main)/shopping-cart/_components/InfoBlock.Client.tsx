import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Info } from '@/assets/icons';
import { cn } from '@/lib/chatbot-modules';

type InfoBlockProps = {
  className?: string;
  scheduledDate?: string;
  title?: string;
  children?: ReactNode;
};

export default function InfoBlock({
  className = '',
  scheduledDate,
  title,
  children,
}: InfoBlockProps) {
  const t = useTranslations('shopping_cart');
  return (
    <div
      className={cn(
        'flex flex-1 flex-row gap-4 rounded-4 border border-gray-80 bg-gray-90 px-8 py-12 text-12 text-gray-00',
        className
      )}
    >
      {children || (
        <>
          <Info className="h-18 w-18 text-gray-60" />
          <p>
            {title ? `${title}` : t('pre_sale_product')}
            <br />
            {t('scheduled_date')} {scheduledDate}.
          </p>
        </>
      )}
    </div>
  );
}
