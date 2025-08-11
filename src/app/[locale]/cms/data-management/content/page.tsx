import { Button } from 'antd';

import { PageContent } from '@/components/cms';

export default function Page() {
  return (
    <PageContent utility={<Button type="primary">Register new content</Button>}>
      <h1 className="text-xl font-semibold">Content</h1>
    </PageContent>
  );
}
