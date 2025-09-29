import { WorkType } from '@/types/work';

import { EpisodeProvider } from './_components/Episode';
import { WorkProvider } from './_components/WorkProvider';

export const Provider = ({
  children,
  workDetail,
}: {
  children: React.ReactNode;
  workDetail: WorkType;
}) => {
  return (
    <WorkProvider workDetail={workDetail}>
      <EpisodeProvider>{children}</EpisodeProvider>
    </WorkProvider>
  );
};
