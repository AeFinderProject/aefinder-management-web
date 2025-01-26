'use client';

import { EditOutlined, HistoryOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { message, Popconfirm, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { useDebounceCallback } from '@/lib/utils';

import SetAppCountDrawer from '@/components/dapp/SetAppCountDrawer';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setOrganizationsList } from '@/store/slices/appSlice';

import { queryAuthToken } from '@/api/apiUtils';
import { getOrganizations, unfreeze } from '@/api/requestApp';

import { OrganizationsItem } from '@/types/appType';

export default function List() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [skipCount, setSkipCount] = useState(1);
  const [maxResultCount, setMaxResultCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalCountItems, setTotalCountItems] = useState(0);
  const [currentOrgId, setCurrentOrgId] = useState('');
  const [isShowChangeAppCountDrawer, setIsShowChangeAppCountDrawer] =
    useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const organizationsList = useAppSelector(
    (state) => state.app.organizationsList
  );
  const isMobile = window?.innerWidth < 640;

  const handleConfirm = useCallback(
    async (orgId: string) => {
      try {
        setLoading(true);
        const res = await unfreeze({
          organizationId: orgId,
        });
        if (res) {
          messageApi.success({
            content: 'Unfreeze success',
            key: 'Unfreeze',
          });
          setNeedRefresh(!needRefresh);
          setCurrentOrgId('');
        }
      } finally {
        setLoading(false);
      }
    },
    [needRefresh, setNeedRefresh, messageApi]
  );

  const handleCancel = useCallback(() => {
    setLoading(false);
    setCurrentOrgId('');
  }, []);

  const columns: TableColumnsType<OrganizationsItem> = [
    {
      title: 'OrganizationName',
      dataIndex: 'organizationName',
      key: 'organizationName',
    },
    {
      title: 'OrganizationId',
      dataIndex: 'organizationId',
      key: 'organizationId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return <>{text === 0 ? 'Active' : 'UnActive'}</>;
      },
    },
    {
      title: 'MaxAppCount',
      dataIndex: 'maxAppCount',
      key: 'maxAppCount',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <div className='relative z-10'>
          <EditOutlined
            className='text-blue-link ml-[20px] mr-[8px] cursor-pointer text-[16px]'
            onClick={() => {
              setCurrentOrgId(record.organizationId);
              setIsShowChangeAppCountDrawer(true);
            }}
          />
          <Popconfirm
            title='Unfreeze the organization'
            description='Are you sure to unfreeze this organization?'
            onConfirm={() => handleConfirm(record.organizationId)}
            onCancel={handleCancel}
            okText='Yes'
            cancelText='No'
            placement='topRight'
          >
            <HistoryOutlined className='text-blue-link ml-[8px] cursor-pointer text-[16px]' />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const getOrganizationsTemp = useDebounceCallback(async () => {
    await queryAuthToken();
    setLoading(true);
    const { items = [], totalCount = 0 } = await getOrganizations({
      skipCount: (skipCount - 1) * maxResultCount,
      maxResultCount,
    });
    setLoading(false);
    dispatch(setOrganizationsList(items));
    setTotalCountItems(totalCount);
  }, [getOrganizations, skipCount, maxResultCount]);

  useEffect(() => {
    getOrganizationsTemp();
  }, [getOrganizationsTemp, skipCount, maxResultCount, needRefresh]);

  const tableOnChange = useCallback(
    (page: number, pageSize: number) => {
      if (page !== skipCount) {
        setSkipCount(page);
      }
      if (maxResultCount !== pageSize) {
        // pageSize change and skipCount need init 1
        setSkipCount(1);
        setMaxResultCount(pageSize);
      }
    },
    [skipCount, maxResultCount]
  );

  return (
    <div className='px-[16px] pb-[28px] pt-[48px]'>
      {contextHolder}
      <Table
        rowKey='organizationId'
        columns={columns}
        dataSource={organizationsList}
        loading={loading}
        className='w-full'
        size={isMobile ? 'small' : 'middle'}
        pagination={{
          current: skipCount,
          pageSize: maxResultCount,
          total: totalCountItems,
          onChange: tableOnChange,
          showSizeChanger: true,
          showTitle: true,
          showTotal: (total) => (isMobile ? '' : `Total ${total} AeIndexer`),
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
      />
      <SetAppCountDrawer
        organizationId={currentOrgId}
        isShowChangeAppCountDrawer={isShowChangeAppCountDrawer}
        setIsShowChangeAppCountDrawer={setIsShowChangeAppCountDrawer}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
    </div>
  );
}
