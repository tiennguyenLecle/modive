import { cache } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { redirect } from '@/lib/navigation';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchWorkDetail } from '@/lib/supabase/swr/work';
import { ROUTES } from '@/utils/constants';

const IntroductionClient = dynamic(() => import('./Introduction.client'), {
  ssr: false,
});

type IntroductionProps = {
  params: { locale: string };
  searchParams: { workId: string };
};

export const generateMetadata = async (props: IntroductionProps) => {
  const { workId } = props.searchParams;

  const { workDetail, error } = await _getWorkData(workId);
  const safeWorkDetail = _handleWorkDataError(workDetail, error);

  return {
    title: safeWorkDetail.title,
    description: safeWorkDetail.description,
  };
};

export default async function IntroductionDetailPage({
  params: { locale },
  searchParams: { workId },
}: IntroductionProps) {
  if (!workId) {
    redirect({ href: ROUTES.HOME, locale });
  }

  const { workDetail, error } = await _getWorkData(workId);
  const safeWorkDetail = _handleWorkDataError(workDetail, error);

  return (
    <main className="bg-white">
      <IntroductionClient fallbackData={safeWorkDetail} workId={workId} />
    </main>
  );
}

// Use React cache to ensure only one fetch in the same request
const _getWorkData = cache(async (workId: string) => {
  const supabase = createServerSupabase('user');

  try {
    const workDetail = await fetchWorkDetail(supabase, workId);
    return { workDetail, error: null };
  } catch (error) {
    return { workDetail: null, error };
  }
});

// Helper function to handle notFound logic
function _handleWorkDataError(workDetail: any, error: any) {
  if (error || !workDetail) {
    notFound();
  }
  return workDetail;
}
