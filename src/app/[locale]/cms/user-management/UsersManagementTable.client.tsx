'use client';

import React, { useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import { UserType } from '@/types/user';
import { ROUTES } from '@/utils/constants';

export const USER_KEYS = {
  all: ['users'] as const,
  detail: (id: string) => ['user', id] as const,
};

type Props = {
  fallbackData?: { data: UserType[]; count: number };
};

type PageSize = 10 | 20 | 50 | 100;
const PAGE_SIZE_OPTIONS: PageSize[] = [10, 20, 50, 100];

const UsersManagementTableClient = ({ fallbackData }: Props) => {
  const t = useTranslations('cms.user_management');
  const router = useRouter();

  // Pagination
  const [pageSize, setPageSize] = useState<PageSize>(PAGE_SIZE_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useUser(
    { page: currentPage, pageSize },
    fallbackData,
    [currentPage, pageSize]
  );

  const columns: ColumnsType<UserType> = [
    {
      title: t('table.column_id', { default: 'ID' }),
      dataIndex: 'id',
      key: 'id',
      width: 50,
      ellipsis: true,
    },
    {
      title: t('table.column_name', { default: 'Name' }),
      dataIndex: 'name',
      key: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: t('table.column_signup_date', {
        default: 'Sign up Date',
      }),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      ellipsis: true,
      render: (value: string | null | undefined) =>
        value ? dayjs(value).format('MMMM D, YYYY') : '-',
      sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
    },
    {
      title: t('table.column_membership', {
        default: 'Membership (TODO)',
      }),
      dataIndex: 'membership',
      key: 'membership',
      width: 150,
      ellipsis: true,
    },
    {
      title: t('table.column_balance', {
        default: 'Balance Money',
      }),
      dataIndex: 'balance',
      key: 'balance',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.balance ?? 0) - (b.balance ?? 0),
    },
    {
      title: '',
      key: 'actions',
      width: 100,
      render: (_: any, record) => {
        return (
          <Button
            type="link"
            aria-label={t('table.detail_button', {
              default: 'View details',
            })}
            onClick={e => {
              router.push(`${ROUTES.CMS.USER_MANAGEMENT}/${record.id}`);
            }}
          >
            <ArrowRightOutlined />
          </Button>
        );
      },
    },
  ];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data?.data}
      loading={isLoading}
      pagination={{
        total: data?.count || 0,
        pageSize,
        current: currentPage,
        onChange: (page, pageSize) => {
          setPageSize(pageSize as PageSize);
          setCurrentPage(page);
        },
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
      }}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default UsersManagementTableClient;
