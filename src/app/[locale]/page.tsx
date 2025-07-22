import { getTranslations } from 'next-intl/server';
import { Button } from 'antd';
import { Link } from '@/lib/navigation';

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 m-32 font-pretendard">
      <h1 className="text-20 font-bold mb-4">{t('homepage.title')}</h1>
      <p className="text-16 mb-8">{t('homepage.description')}</p>
      <div className="flex gap-4">
        <Link href="/animation">
          <Button type="primary">{t('navigation.animation_test')}</Button>
        </Link>
        <Link href="/font-test">
          <Button>Font Test</Button>
        </Link>
        <Link
          href={{
            pathname: '/animation',
            query: { sort: 'a2z', text: 'abc' },
          }}
        >
          <Button type="dashed">Animation with Params</Button>
        </Link>
        <div>
          <Button size="small">Small</Button>
          <Button size="middle">Middle</Button>
          <Button size="large">Large</Button>
        </div>
      </div>
    </div>
  );
}
