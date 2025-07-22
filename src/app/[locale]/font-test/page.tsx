import { getTranslations } from 'next-intl/server';

export default async function FontTestPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();

  return (
    <div className="flex flex-col gap-16 p-16">
      <h1 className="text-3xl mb-4 font-bold">Font Test Page</h1>
      <p className="text-lg mb-4">Current locale: {locale}</p>

      <div className="space-y-4 text-left">
        <div>
          <h2 className="text-xl font-semibold">Regular Text</h2>
          <p>The quick brown fox jumps over the lazy dog.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Korean Text</h2>
          <p>안녕하세요! 반갑습니다.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Numbers & Symbols</h2>
          <p>1234567890 !@#$%^&*()</p>
        </div>
      </div>
    </div>
  );
}
