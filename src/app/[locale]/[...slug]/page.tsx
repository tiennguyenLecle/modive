import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Generate metadata với translations
export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  const t = await getTranslations({
    namespace: 'notfound_page',
    locale,
  });

  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
};

type CatchAllPageProps = {
  params: {
    locale: string;
    slug: string[];
  };
};

export default function CatchAllPage({ params }: CatchAllPageProps) {
  // Log các route không tồn tại để phân tích (chỉ trong development)
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `[404] Route not found: /${params.locale}/${params.slug?.join('/') || ''}`
    );
  }

  notFound();
}
