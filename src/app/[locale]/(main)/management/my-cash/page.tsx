import dynamic from 'next/dynamic';

const CashClient = dynamic(() => import('./Cash.client'), {
  ssr: false,
});

type CashProps = {
  params: { locale: string };
  searchParams: { workId: string };
};

export default async function IntroductionDetailPage({}: CashProps) {
  return (
    <main className="relative bg-gray-90">
      <CashClient />
    </main>
  );
}
