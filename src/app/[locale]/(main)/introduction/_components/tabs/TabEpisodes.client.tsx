'use client';

import { EpisodeHeader, EpisodeList, EpisodeProvider } from '../Episode';

export default function TabEpisodes() {
  return (
    <EpisodeProvider>
      <EpisodeHeader />
      <EpisodeList />
    </EpisodeProvider>
  );
}
