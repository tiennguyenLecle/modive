import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const LoginClient = dynamic(() => import('./Login.client'), { ssr: false });

export default function LoginPage() {
  const t = useTranslations('login_page');

  return (
    <main
      data-no-navigation
      className="flex w-full flex-1 flex-col items-center bg-modive-background"
      style={{
        backgroundSize: '768rem 716rem',
        backgroundPosition: 'center 56rem',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex h-56 w-full items-center justify-center border-b border-b-gray-80">
        <h1 className="text-16 font-semibold">{t('title')}</h1>
      </div>
      <LoginClient />
    </main>
  );
}
