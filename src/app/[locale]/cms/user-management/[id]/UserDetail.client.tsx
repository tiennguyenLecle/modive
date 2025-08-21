'use client';

import React from 'react';
import { Flex } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { useUserDetail } from '@/hooks/useUser';
import { UserType } from '@/types/user';

import TransactionHistoryTableClient from './_components/TransactionHistoryTable.client';

export const USER_KEYS = {
  all: ['users'] as const,
  detail: (id: string) => ['user', id] as const,
};
type Props = {
  id: string;
  fallbackData?: UserType;
};
const UserDetailClient = ({ id, fallbackData }: Props) => {
  const t = useTranslations('cms.user_management');

  const { data, isLoading } = useUserDetail(id, fallbackData);

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
    },
  ];
  return (
    <Flex gap={'medium'} vertical>
      <Table
        columns={columns}
        dataSource={data ? [data] : []}
        pagination={false}
      />
      <TransactionHistoryTableClient />
    </Flex>
  );
};

export default UserDetailClient;
