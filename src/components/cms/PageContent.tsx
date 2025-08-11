import { CmsBreadCrumb } from '.';

type PageContentProps = {
  children?: React.ReactNode;
  utility?: React.ReactNode;
};

export default function PageContent({ children, utility }: PageContentProps) {
  return (
    <div className="flex flex-1 flex-col bg-gray-80 p-16">
      <div className="mb-16 flex items-center justify-between">
        <CmsBreadCrumb />
        {utility}
      </div>
      <div className="min-h-0 flex-1 overflow-auto rounded-8 bg-white p-16">
        {children}
      </div>
    </div>
  );
}
