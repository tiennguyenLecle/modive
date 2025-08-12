import dynamic from 'next/dynamic';

import { PageContent } from '@/components/cms';

const LoginClient = dynamic(() => import('./Login.client'), { ssr: false });

export default function LoginPage() {
  return (
    <PageContent blank data-no-sidebar>
      <LoginClient />
    </PageContent>
  );
}
