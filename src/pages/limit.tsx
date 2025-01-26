'use client';

import { ControlOutlined, SearchOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Button, Dropdown, Input, MenuProps, Select, Table } from 'antd';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import { useDebounceCallback } from '@/lib/utils';

import UpdateSettingDrawer from '@/components/dapp/UpdateSettingsDrawer';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppLimitList } from '@/store/slices/appSlice';
import { setOrganizationsCommon } from '@/store/slices/commonSlice';

import { queryAuthToken } from '@/api/apiUtils';
import { getAppLimitList, getOrganizations } from '@/api/requestApp';

import { GetAppResourceLimitItemType } from '@/types/appType';

const Option = Select.Option;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <></>,
  },
];

const columns: TableColumnsType<GetAppResourceLimitItemType> = [
  { title: 'AppId', dataIndex: 'appId', key: 'appId' },
  { title: 'AeIndexerName', dataIndex: 'appName', key: 'appName' },
  {
    title: 'OrganizationName',
    dataIndex: 'organizationName',
    key: 'organizationName',
  },
  {
    title: 'AeIndexerFullPodLimitCpuCore/Memory',
    dataIndex: '',
    key: 'appFullPodLimitCpuCore',
    render: (record) => (
      <div>
        {record?.resourceLimit?.appFullPodLimitCpuCore}/
        {record?.resourceLimit?.appFullPodLimitMemory}
      </div>
    ),
  },
  {
    title: 'AeIndexerFullPodRequestCpuCore/Memory',
    dataIndex: '',
    key: 'appFullPodRequestCpuCore',
    render: (record) => (
      <div>
        {record?.resourceLimit?.appFullPodRequestCpuCore}/
        {record?.resourceLimit?.appFullPodRequestMemory}
      </div>
    ),
  },
  {
    title: 'AeIndexerQueryPodRequestCpuCore/Memory',
    dataIndex: '',
    key: 'appQueryPodRequestCpuCore',
    render: (record) => (
      <div>
        {record?.resourceLimit?.appQueryPodRequestCpuCore}/
        {record?.resourceLimit?.appQueryPodRequestMemory}
      </div>
    ),
  },
  {
    title: 'AeIndexerPodReplicas',
    dataIndex: '',
    key: 'appPodReplicas',
    render: (record) => <div>{record?.resourceLimit?.appPodReplicas}</div>,
  },
  {
    title: 'MaxEntityCallCount/Size',
    dataIndex: '',
    key: 'maxEntityCallCount',
    render: (record) => (
      <div>
        {record?.operationLimit?.maxEntityCallCount}/
        {record?.operationLimit?.maxEntitySize}
      </div>
    ),
  },
  {
    title: 'MaxLogCallCount/Size',
    dataIndex: '',
    key: 'maxLogCallCount',
    render: (record) => (
      <div>
        {record?.operationLimit?.maxLogCallCount}/
        {record?.operationLimit?.maxLogSize}
      </div>
    ),
  },
  {
    title: 'MaxContractCallCount',
    dataIndex: '',
    key: 'maxContractCallCount',
    render: (record) => (
      <div>{record?.operationLimit?.maxContractCallCount}</div>
    ),
  },
  {
    title: 'EnableMultipleInstances',
    dataIndex: '',
    key: 'enableMultipleInstances',
    render: (record) => (
      <div>
        {record?.resourceLimit?.enableMultipleInstances ? 'true' : 'false'}
      </div>
    ),
  },
  {
    title: 'MaxAeIndexerCodeSize',
    dataIndex: '',
    key: 'maxAppCodeSize',
    render: (record) => <div>{record?.deployLimit?.maxAppCodeSize}</div>,
  },
  {
    title: 'MaxAeIndexerAttachmentSize',
    dataIndex: '',
    key: 'maxAppAttachmentSize',
    render: (record) => <div>{record?.deployLimit?.maxAppAttachmentSize}</div>,
  },
];

export default function Limit() {
  const dispatch = useAppDispatch();
  const [organizationId, setOrganizationId] = useState('');
  const [appId, setAppId] = useState('');
  const [skipCount, setSkipCount] = useState(1);
  const [maxResultCount, setMaxResultCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [tempOrganizationId, setTempOrganizationId] = useState('');
  const [rowSelection, setRowSelection] = useState<
    GetAppResourceLimitItemType[]
  >([]);
  const [totalCountItems, setTotalCountItems] = useState(0);
  const [isShowUpdateDrawer, setIsShowUpdateDrawer] = useState(false);
  const appLimitList = useAppSelector((state) => state.app.appLimitList);
  const organizationsCommon = useAppSelector(
    (state) => state.common.organizationsCommon
  );
  const isMobile = window?.innerWidth < 640;

  const getOrganizationsCommon = useCallback(async () => {
    await queryAuthToken();
    const { items = [] } = await getOrganizations({
      skipCount: 0,
      maxResultCount: 1000,
    });
    dispatch(setOrganizationsCommon(items));
  }, [dispatch]);

  useEffect(() => {
    getOrganizationsCommon();
  }, [getOrganizationsCommon]);

  const getAppLimitListTemp = useDebounceCallback(async () => {
    await queryAuthToken();
    setLoading(true);
    const { items = [], totalCount = 0 } = await getAppLimitList({
      organizationId,
      appId,
      skipCount: (skipCount - 1) * maxResultCount,
      maxResultCount,
    });
    setLoading(false);
    dispatch(setAppLimitList(items));
    setTotalCountItems(totalCount);
  }, [organizationId, appId, skipCount, maxResultCount, isShowUpdateDrawer]);

  useEffect(() => {
    getAppLimitListTemp();
  }, [getAppLimitListTemp]);

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
            defaultValue={appId}
            onBlur={(e) => setAppId(e.target.value)}
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
            trigger={['click']}
            dropdownRender={() => {
              return (
                <div
                  className={clsx(
                    'bg-white-normal flex w-[308px] flex-col items-center rounded-md border border-solid p-[16px] sm:w-[388px]'
                  )}
                >
                  <div className='mb-[16px] flex w-full items-center justify-between'>
                    <div className='mr-[10px] text-sm font-medium'>
                      OrganizationId
                    </div>
                    <Select
                      value={tempOrganizationId}
                      placeholder='Please input OrganizationId'
                      onChange={(value) => setTempOrganizationId(value)}
                      showSearch={true}
                      style={{
                        width: 250,
                        height: 32,
                        borderColor: '#E0E0E0',
                        borderRadius: '8px',
                      }}
                    >
                      {organizationsCommon?.map((item) => {
                        return (
                          <Option key={item.organizationId}>
                            {item.organizationName}
                          </Option>
                        );
                      })}
                    </Select>
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
          <Button
            className='text-blue-link border-blue-link bg-white-normal w-[20px] border border-solid sm:w-[174px]'
            onClick={() => setIsShowUpdateDrawer(!isShowUpdateDrawer)}
            disabled={rowSelection?.length === 0}
            iconPosition='end'
          >
            {isMobile ? '...' : 'Batch Update'}
          </Button>
        </div>
      </div>
      <Table
        rowKey={(record) => record.appId}
        columns={columns}
        dataSource={appLimitList}
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
          showTotal: (total) => (isMobile ? '' : `Total ${total} AeIndexer`),
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
      />
      <UpdateSettingDrawer
        updateType='batch'
        appIds={rowSelection?.map((item) => item.appId)}
        isShowUpdateDrawer={isShowUpdateDrawer}
        setIsShowUpdateDrawer={setIsShowUpdateDrawer}
      />
    </div>
  );
}
