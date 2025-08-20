'use client';

import { Alarm } from '@/assets/icons';
import { Badge, Chapter, Story } from '@/components';

export default function ComponentsPage() {
  return (
    <main>
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
      <h2>Modal</h2>
      <h2>Chat list item</h2>

      <div className="p-2">
        <h2>Badge</h2>
        <Badge.Wrapper count={3} showZero>
          <Alarm width={24} height={24} className="text-primary" />
        </Badge.Wrapper>
        <Badge.CountNode count={3} showZero />
      </div>
      <div className="p-2">
        <h2>Story Component</h2>

        <div className="flex flex-col gap-16 bg-white p-16">
          <Story.Text>
            {
              'You have made their debut only after a tough trainee life. But the public&apos;s response is still cold ... We got married. He will appear in the reality entertainment program We Got Married to show a virtual marriage.'
            }
          </Story.Text>
          <Story.Image
            src="https://picsum.photos/seed/1/400"
            alt="Story Image"
            width={160}
            height={160}
          />
        </div>
      </div>
      <div className="p-2">
        <h2>Story Component</h2>

        <div className="flex flex-col gap-16 bg-white p-16">
          <Story.Text>
            {
              'You have made their debut only after a tough trainee life. But the public&apos;s response is still cold ... We got married. He will appear in the reality entertainment program We Got Married to show a virtual marriage.'
            }
          </Story.Text>
          <Story.Image
            src="https://picsum.photos/seed/1/400"
            alt="Story Image"
            width={160}
            height={160}
          />
        </div>
      </div>
    </main>
  );
}
