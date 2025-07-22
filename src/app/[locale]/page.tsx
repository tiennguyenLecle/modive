import { Button } from 'antd';
import { getTranslations } from 'next-intl/server';

import { Spinner } from '@/components';
import { Link } from '@/lib/navigation';

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="m-32 flex flex-col items-center justify-center p-8 font-pretendard">
      <h1 className="mb-4 text-20 font-bold">{t('homepage.title')}</h1>
      <p className="mb-8 text-16">{t('homepage.description')}</p>
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
