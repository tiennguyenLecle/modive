'use client';

import { Button, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import {
  useAnnouncementMutations,
  useAnnouncements,
} from '@/hooks/useAnnouncement';
import { useRouter } from '@/lib/navigation';
import {
  AnnouncementStatus,
  type AnnouncementRecord,
} from '@/types/announcement.types';
import { ROUTES } from '@/utils/constants';

type Props = {
  fallbackData?: AnnouncementRecord[];
};

export function AnnouncementsTable({ fallbackData }: Props) {
  const t = useTranslations('cms.announcement');
  const router = useRouter();
  const { data, isLoading } = useAnnouncements({}, fallbackData);
  const { publish } = useAnnouncementMutations();

  const columns: ColumnsType<AnnouncementRecord> = [
    {
      title: t('table.column_id'),
      dataIndex: 'id',
      key: 'id',
      width: 50,
      ellipsis: true,
    },
    {
      title: t('table.column_publication_date'),
      dataIndex: 'publication_date',
      key: 'publication_date',
      width: 200,
      render: (value: string | null | undefined) =>
        value ? dayjs(value).format('YYYY-MM-DD') : '-',
    },
    {
      title: t('table.column_expire_date'),
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      width: 200,
      render: (value: string | null | undefined) =>
        value ? dayjs(value).format('YYYY-MM-DD') : '-',
    },
    {
      title: t('table.column_title'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
      render: (text: string | null | undefined) => (
        <Typography.Text ellipsis>{text || '-'}</Typography.Text>
      ),
    },
    {
      title: t('table.column_status'),
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (value: string | null | undefined) => {
        const status = (value || 'draft') as AnnouncementStatus;
        let color: string;
        let label: string;
        switch (status) {
          case AnnouncementStatus.PUBLISHED:
            color = 'green';
            label = 'Published';
            break;
          case AnnouncementStatus.ARCHIVED:
            color = 'orange';
            label = 'Archived';
            break;
          default:
            color = 'default';
            label = 'Draft';
        }
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: '',
      key: 'actions',
      width: 140,
      render: (_: any, record) => {
        const isPublished = record.status === AnnouncementStatus.PUBLISHED;
        return (
          <Button
            type="link"
            disabled={isPublished}
            onClick={e => {
              e.stopPropagation();
              publish.trigger(record.id);
            }}
          >
            {t('table.list_publish')}
          </Button>
        );
      },
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      onRow={record => ({
        onClick: () =>
          router.push(
            `${ROUTES.CMS.DATA_MANAGEMENT.ANNOUNCEMENTS.EDIT}/${record.id}`
          ),
      })}
      scroll={{ x: 'max-content' }}
    />
  );
}
