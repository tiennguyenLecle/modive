import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/locale';
import { Button } from 'antd';
import Link from 'next/link';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">{dict.homepage.title}</h1>
      <p className="text-lg mb-8">{dict.homepage.description}</p>
      <div className="flex gap-4">
        <Link href={`/animation`}>
          <Button type="primary">{dict.navigation.animation_test}</Button>
        </Link>
        <Link href={`/${lang}/font-test`}>
          <Button>Font Test</Button>
        </Link>
      </div>
    </div>
  );
}
