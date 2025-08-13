import dynamic from 'next/dynamic';

const LoginClient = dynamic(() => import('./Login.client'), { ssr: false });

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-16">
      <LoginClient />
    </main>
  );
}
