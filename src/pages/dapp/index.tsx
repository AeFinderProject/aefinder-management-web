'use client';

import {
  ControlOutlined,
  DownOutlined,
  FileSearchOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Button, Dropdown, Input, MenuProps, Table } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDebounceCallback } from '@/lib/utils';

import ActionMenu from '@/components/dapp/ActionMenu';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppList } from '@/store/slices/appSlice';

import { queryAuthToken } from '@/api/apiUtils';
import { getAppList } from '@/api/requestApp';

import { AppStatus, GetAppResponseItem } from '@/types/appType';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <></>,
  },
];

export default function List() {
  const dispatch = useAppDispatch();
  const [organizationId, setOrganizationId] = useState('');
  const [appId, setAppId] = useState('');
  const [skipCount, setSkipCount] = useState(1);
  const [maxResultCount, setMaxResultCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [tempOrganizationId, setTempOrganizationId] = useState('');
  const [rowSelection, setRowSelection] = useState<GetAppResponseItem[]>([]);
  const [totalCountItems, setTotalCountItems] = useState(0);
  const [isShowBatchBox, setIsShowBatchBox] = useState(true);
  const [needRefresh, setNeedRefresh] = useState(false);
  const router = useRouter();
  const appList = useAppSelector((state) => state.app.appList);
  const isMobile = window?.innerWidth < 640;

  const columns: TableColumnsType<GetAppResponseItem> = [
    { title: 'AppId', dataIndex: 'appId', key: 'appId' },
    { title: 'AppName', dataIndex: 'appName', key: 'appName' },
    {
      title: 'OrganizationName',
      dataIndex: 'organizationName',
      key: 'organizationName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (record) => {
        return <>{record === AppStatus.Deployed ? 'Deployed' : 'UnDeployed'}</>;
      },
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (record) => {
        return <>{dayjs(record).format('YYYY-MM-DD HH:mm:ss')}</>;
      },
    },
    {
      title: 'UpdateTime',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (record) => {
        return <>{dayjs(record).format('YYYY-MM-DD HH:mm:ss')}</>;
      },
    },
    {
      title: 'CurrentVersion',
      dataIndex: '',
      key: 'currentVersion',
      render: (record) => {
        return <>{record?.versions?.currentVersion}</>;
      },
    },
    {
      title: 'PendingVersion',
      dataIndex: '',
      key: 'pendingVersion',
      render: (record) => {
        return <>{record?.versions?.pendingVersion}</>;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      fixed: isMobile ? false : 'right',
      render: (record) => (
        <div className='relative z-10'>
          <FileSearchOutlined
            className='text-blue-link mr-[8px] cursor-pointer text-[16px]'
            onClick={() => {
              router.push(`/dapp/${record.appId}`);
            }}
          />
        </div>
      ),
    },
  ];

  const getAppListTemp = useDebounceCallback(async () => {
    await queryAuthToken();
    setLoading(true);
    const { items = [], totalCount = 0 } = await getAppList({
      organizationId,
      appId,
      skipCount: (skipCount - 1) * maxResultCount,
      maxResultCount,
    });
    setLoading(false);
    dispatch(setAppList(items));
    setTotalCountItems(totalCount);
  }, [getAppList, organizationId, appId, skipCount, maxResultCount]);

  useEffect(() => {
    getAppListTemp();
  }, [
    getAppListTemp,
    organizationId,
    appId,
    skipCount,
    maxResultCount,
    needRefresh,
  ]);

  const handleSearch = useDebounceCallback(async (e) => {
    setAppId(e.target.value);
    setSkipCount(1);
  }, []);

  const handleClearFilter = useCallback(() => {
    setOrganizationId('');
    setTempOrganizationId('');
    setSkipCount(1);
  }, []);

  const handleApplyFilter = useCallback(() => {
    setOrganizationId(tempOrganizationId);
    setSkipCount(1);
  }, [tempOrganizationId]);

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
      <div className='mb-[16px] flex w-full items-center justify-between'>
        <div className='relative'>
          <Input
            placeholder='Search by AppId'
            value={appId}
            onChange={(e) => handleSearch(e)}
            style={{
              width: 160,
              height: 32,
              borderColor: '#E0E0E0',
              borderRadius: '8px',
              marginRight: '8px',
            }}
            prefix={<SearchOutlined className='text-[#E0E0E0]' />}
          />
          <Dropdown
            menu={{ items }}
            placement='bottom'
            dropdownRender={() => {
              return (
                <div
                  className={clsx(
                    'bg-white-normal flex w-[308px] flex-col items-center rounded-md border border-solid p-[16px] sm:w-[388px]'
                  )}
                >
                  <div className='mb-[16px] flex w-full items-center justify-between'>
                    <div className='mr-[8px] text-sm font-medium'>
                      OrganizationId{' '}
                    </div>
                    <Input
                      placeholder='Please input OrganizationId'
                      value={tempOrganizationId}
                      onChange={(e) => setTempOrganizationId(e.target.value)}
                      style={{
                        width: 250,
                        height: 32,
                        borderColor: '#E0E0E0',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                  <div className='flex w-full items-center justify-between'>
                    <Button
                      className='text-blue-link border-blue-link bg-white-normal w-[174px] border border-solid'
                      onClick={() => handleClearFilter()}
                    >
                      Clear Filter
                    </Button>
                    <Button
                      className='ml-[8px] w-[174px]'
                      type='primary'
                      onClick={() => handleApplyFilter()}
                    >
                      Apply Filter
                    </Button>
                  </div>
                </div>
              );
            }}
          >
            <Button
              className={clsx(organizationId ? 'bg-gray-F5' : '')}
              icon={<ControlOutlined />}
            >
              Filters
              {organizationId ? ` (1)` : ''}
            </Button>
          </Dropdown>
        </div>
        <div className='relative'>
          <Dropdown
            menu={{ items }}
            placement='bottom'
            trigger={['click']}
            dropdownRender={() => {
              return (
                <ActionMenu
                  updateType='batch'
                  appIds={rowSelection.map((item) => item.appId)}
                  isShowBatchBox={isShowBatchBox}
                  setIsShowBatchBox={setIsShowBatchBox}
                  needRefresh={needRefresh}
                  setNeedRefresh={setNeedRefresh}
                />
              );
            }}
          >
            <Button
              className='text-blue-link border-blue-link bg-white-normal w-[20px] border border-solid sm:w-[174px]'
              disabled={rowSelection?.length === 0}
              icon={!isMobile && <DownOutlined />}
              iconPosition='end'
              onClick={() => setIsShowBatchBox(true)}
            >
              {isMobile ? '...' : 'Batch Actions'}
            </Button>
          </Dropdown>
        </div>
      </div>
      <Table
        rowKey={(record) => record.appId}
        columns={columns}
        dataSource={appList}
        loading={loading}
        scroll={{ x: 1700 }}
        className='w-full'
        size={isMobile ? 'small' : 'middle'}
        rowSelection={{
          onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
            setRowSelection(selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
            setRowSelection(selectedRows);
          },
        }}
        pagination={{
          current: skipCount,
          pageSize: maxResultCount,
          total: totalCountItems,
          onChange: tableOnChange,
          showSizeChanger: true,
          showTitle: true,
          showTotal: (total) => (isMobile ? '' : `Total ${total} apps`),
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
      />
    </div>
  );
}
