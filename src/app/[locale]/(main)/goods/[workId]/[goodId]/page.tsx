import { Header } from '@/components';

import GoodDetail from './_components/GoodDetail.client';
import { GoodDetailProvider } from './_provider/GoodDetailProvider';

type Props = {
  params: { workId: string; goodId: string };
};

const GoodDetailPage = (props: Props) => {
  const { params } = props;
  const { goodId } = params;

  return (
    <main data-no-navigation className="flex flex-col">
      <Header
        title="Good Detail"
        showBackButton
        showCartIcon
        className="border-b border-gray-80"
      />
      <div className="no-scrollbar min-h-0 flex-1 overflow-auto">
        <GoodDetailProvider goodId={goodId}>
          <GoodDetail />
        </GoodDetailProvider>
      </div>
    </main>
  );
};

export default GoodDetailPage;
