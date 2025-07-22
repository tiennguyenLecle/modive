import { Button, Result } from 'antd';
import { useTranslations } from 'next-intl';

import { Link } from '@/lib/navigation';

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle={
          t('errors.not_found_description') ||
          'Sorry, the page you visited does not exist.'
        }
        extra={
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button type="primary" size="large">
                {t('navigation.back_home') || 'Back Home'}
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
