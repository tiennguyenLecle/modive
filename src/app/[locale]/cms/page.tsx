import { redirect } from '@/lib/navigation';
import { ROUTES } from '@/utils/constants';

type PageProps = {
  params: { locale: string };
};

export default function Page({ params: { locale } }: PageProps) {
  redirect({ href: ROUTES.CMS.DATA_MANAGEMENT.CONTENT, locale });
}
