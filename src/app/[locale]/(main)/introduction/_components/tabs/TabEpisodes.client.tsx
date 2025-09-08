'use client';

import { EpisodeHeader, EpisodeList, EpisodeProvider } from '../Episode';

export default function TabEpisodes() {
  return (
    <EpisodeProvider>
      <div className="flex h-full flex-col bg-gray-90">
        <EpisodeHeader />
        <EpisodeList />
      </div>
    </EpisodeProvider>
  );
}
