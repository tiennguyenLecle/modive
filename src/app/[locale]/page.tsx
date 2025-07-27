import { getTranslations } from 'next-intl/server';

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = await getTranslations({ namespace: 'home_page.metadata', locale });
  return {
    title: t('title'),
    description: t('description'),
  };
};

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="container flex flex-1 flex-col items-center justify-center">
      <h1 className="mb-4 text-20 font-bold">Home Page</h1>
    </div>
  );
}
