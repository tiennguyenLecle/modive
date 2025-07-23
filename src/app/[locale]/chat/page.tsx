import { DatePicker, Form, Input, InputNumber } from 'antd';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = await getTranslations({ namespace: 'chat_page.metadata', locale });
  return {
    title: t('title'),
    description: t('description'),
  };
};

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="container flex flex-1 flex-col items-center justify-center">
      <h1 className="mb-4 text-20 font-bold">Chat Page</h1>
      <Input />
      <Input.TextArea />
      <InputNumber />
      <DatePicker />

      <Form>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Birthday" name="birthday">
          <DatePicker />
        </Form.Item>
      </Form>
    </div>
  );
}
