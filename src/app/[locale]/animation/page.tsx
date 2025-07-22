import { getTranslations } from 'next-intl/server';

export default async function AnimationPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();
  await new Promise(resolve => setTimeout(resolve, 2000));

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl mb-4 font-bold">Animation Page</h1>
        <p className="text-lg mb-4">Current locale: {locale}</p>
        <p className="text-gray-600">{t('navigation.animation_test')}</p>

        <div className="mt-8">
          <div className="mx-auto h-16 w-16 animate-bounce rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}
