'use client';

import { DatePicker, Form, Input, InputNumber } from 'antd';

export default function ChatView() {
  return (
    <>
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
    </>
  );
}
