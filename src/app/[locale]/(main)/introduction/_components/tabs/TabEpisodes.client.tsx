'use client';

import { EpisodeHeader, EpisodeList, EpisodeProvider } from '../Episode';

type TabEpisodesProps = {
  workId?: string;
};

export default function TabEpisodes() {
  return (
    <EpisodeProvider>
      <div className="flex h-full flex-col">
        <EpisodeHeader />
        <EpisodeList />
      </div>
    </EpisodeProvider>
  );
}
