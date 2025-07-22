import { getTranslations } from 'next-intl/server';

export default async function AnimationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Animation Page</h1>
        <p className="text-lg mb-4">Current locale: {locale}</p>
        <p className="text-gray-600">{t('navigation.animation_test')}</p>

        <div className="mt-8">
          <div className="animate-bounce w-16 h-16 bg-blue-500 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
