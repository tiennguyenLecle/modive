import { Spin } from 'antd';

export default function Loading() {
  return (
    <main className="flex h-full items-center justify-center">
      <Spin size="large" />
    </main>
  );
}
