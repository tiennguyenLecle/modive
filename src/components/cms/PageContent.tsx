import { cx } from '@/utils/method';

import { CmsBreadCrumb } from '.';

type PageContentProps = {
  children?: React.ReactNode;
  utility?: React.ReactNode;
  blank?: boolean;
};

export default function PageContent({
  children,
  utility,
  blank = false,
}: PageContentProps) {
  return (
    <main
      className={cx(
        'flex min-h-screen flex-col p-16',
        blank ? 'bg-transparent' : 'bg-gray-80'
      )}
    >
      {!blank && (
        <div className="mb-16 flex items-center justify-between">
          <CmsBreadCrumb />
          {utility}
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-auto rounded-8 bg-white p-16">
        {children}
      </div>
    </main>
  );
}
