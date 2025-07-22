import { getTranslations } from 'next-intl/server';

export default async function FontTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Font Test Page</h1>
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
    </div>
  );
}
