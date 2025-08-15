'use client';

import { useEffect } from 'react';
import { Button, DatePicker, Form, Input, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { PageContent } from '@/components/cms';
import { useAnnouncementMutations } from '@/hooks/useAnnouncement';
import {
  AnnouncementStatus,
  type AnnouncementRecord,
} from '@/types/announcement.types';

type AnnouncementFormProps = {
  mode: 'create' | 'edit';
  announcementId?: string;
  fallbackData?: AnnouncementRecord | null;
};

type FormValues = {
  publication_date: Dayjs;
  expiration_date: Dayjs;
  title: string;
  content: string;
  status: AnnouncementStatus;
};

export function AnnouncementForm({
  mode,
  announcementId,
  fallbackData,
}: AnnouncementFormProps) {
  const t = useTranslations('cms.announcement');
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const { create, update } = useAnnouncementMutations();

  useEffect(() => {
    if (mode !== 'edit' || !announcementId) return;
    if (fallbackData) {
      const { title, content, publication_date, expiration_date } =
        fallbackData;
      form.setFieldsValue({
        title,
        content,
        publication_date: dayjs(publication_date),
        expiration_date: dayjs(expiration_date),
      });
    }
  }, [announcementId, fallbackData, form, mode]);

  const handleQuickExpire = (days: number) => {
    const pub = form.getFieldValue('publication_date') as any;
    if (!pub) {
      message.warning(t('form.select_publication_date_first'));
      return;
    }
    const next = (pub as any).add(days, 'day');
    form.setFieldsValue({ expiration_date: next });
  };

  const onFinish = async (values: FormValues) => {
    const { title, content, publication_date, expiration_date, status } =
      values;
    const payload = {
      title,
      content,
      publication_date: dayjs(publication_date).format('YYYY-MM-DD'),
      expiration_date: dayjs(expiration_date).format('YYYY-MM-DD'),
      status,
    };

    if (mode === 'create') {
      create.trigger(payload);
    } else if (announcementId) {
      update.trigger({ id: announcementId, payload });
    }
  };

  const handleSubmit = (status: AnnouncementStatus) => {
    form.setFieldValue('status', status);
    form.submit();
  };

  return (
    <PageContent
      utility={
        <div className="flex items-center gap-8">
          <Button onClick={() => router.back()}>{t('form.cancel')}</Button>
          <Button
            onClick={() => handleSubmit(AnnouncementStatus.DRAFT)}
            loading={create.isMutating || update.isMutating}
          >
            {t('form.save_as_draft')}
          </Button>
          <Button
            type="primary"
            onClick={() => handleSubmit(AnnouncementStatus.PUBLISHED)}
            loading={create.isMutating || update.isMutating}
          >
            {mode === 'create' ? t('form.publish') : t('form.save')}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{}}
      >
        <Form.Item name="status" noStyle />
        <div className="flex flex-wrap items-center gap-24">
          <Form.Item
            label={t('form.publication_date')}
            name="publication_date"
            rules={[
              { required: true, message: t('form.publication_date_required') },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item label={t('form.expiration_date')} required>
            <div className="flex items-center gap-8">
              <Form.Item name="expiration_date" noStyle>
                <DatePicker />
              </Form.Item>
              <div className="flex items-center gap-4">
                <Button onClick={() => handleQuickExpire(10)}>
                  +10 {t('form.days')}
                </Button>
                <Button onClick={() => handleQuickExpire(15)}>
                  +15 {t('form.days')}
                </Button>
                <Button onClick={() => handleQuickExpire(30)}>
                  +30 {t('form.days')}
                </Button>
              </div>
            </div>
          </Form.Item>
        </div>

        <Form.Item
          label={t('form.title')}
          name="title"
          rules={[{ required: true, message: t('form.title_required') }]}
        >
          <Input placeholder={t('form.title_placeholder')} />
        </Form.Item>

        <Form.Item label={t('form.content')} name="content">
          <Input.TextArea
            rows={6}
            placeholder={t('form.content_placeholder')}
          />
        </Form.Item>
      </Form>
    </PageContent>
  );
}
