import dynamic from 'next/dynamic';

const LoginClient = dynamic(() => import('./Login.client'), { ssr: false });

export default function LoginPage() {
  return <LoginClient />;
}
