import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/locale';
import { Button } from 'antd';
import LocalizedLink from '@/components/LocalizedLink';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 m-32 font-pretendard">
      <h1 className="text-20 font-bold mb-4">{dict.homepage.title}</h1>
      <p className="text-16 mb-8">{dict.homepage.description}</p>
      <div className="flex gap-4">
        <LocalizedLink href="/animation">
          <Button type="primary">{dict.navigation.animation_test}</Button>
        </LocalizedLink>
        <LocalizedLink href="/font-test">
          <Button>Font Test</Button>
        </LocalizedLink>
        <LocalizedLink
          href={{
            pathname: '/animation',
            query: { sort: 'a2z', text: 'abc' },
          }}
        >
          <Button type="dashed">Animation with Params</Button>
        </LocalizedLink>
        <div>
          <Button size="small">Small</Button>
          <Button size="middle">Middle</Button>
          <Button size="large">Large</Button>
        </div>
      </div>
    </div>
  );
}
