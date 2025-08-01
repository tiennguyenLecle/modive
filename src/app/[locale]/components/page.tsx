import Chapter from '@/components/Chapter';
import RecommendationContainer from '@/components/Recommendation/Container';
import ContentsCard from '@/components/Recommendation/ContentsCard';
import ContentsCardList from '@/components/Recommendation/ContentsCardList';

export default function ComponentsPage() {
  return (
    <div>
      <h1>Components</h1>
      <h2>Chapter</h2>
      <Chapter
        title="Chapter 1"
        img="https://picsum.photos/seed/1/150"
        episodes={[
          { key: '1', title: 'Episode 1', url: '#' },
          { key: '2', title: 'Episode 2', url: '#' },
        ]}
      />
      <Chapter
        title="Chapter 2"
        img="https://picsum.photos/seed/2/150"
        locked
        episodes={[
          { key: '1', title: 'Episode 1', url: '#' },
          { key: '2', title: 'Episode 2', url: '#' },
        ]}
      />
      <Chapter
        title="Chapter 3"
        img="https://picsum.photos/seed/3/150"
        episodes={[
          { key: '1', title: 'Episode 1', url: '#' },
          { key: '2', title: 'Episode 2', url: '#' },
        ]}
      />
      <h2>Recommendation</h2>
      <RecommendationContainer />
    </div>
  );
}
