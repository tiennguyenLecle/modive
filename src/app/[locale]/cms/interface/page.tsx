import { Button } from 'antd';

import { PageContent } from '@/components/cms';
import MainEditor from '@/components/cms/interface/MainEditor';
import MobilePreview from '@/components/cms/interface/MobilePreview';
import { CMSInterfaceProvider } from '@/lib/context/CMSInterface';

export default function Page() {
  return (
    <PageContent utility={<Button type="primary">Save</Button>}>
      <CMSInterfaceProvider>
        <div className="relative flex gap-16">
          <MainEditor />
          <MobilePreview />
        </div>
      </CMSInterfaceProvider>
    </PageContent>
  );
}
