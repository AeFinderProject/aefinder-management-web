import {
  ControlOutlined,
  DownOutlined,
  FileSearchOutlined,
  SearchOutlined,
  SmallDashOutlined,
  UpOutlined,
} from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Button, Input, Table } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDebounceCallback } from '@/lib/utils';

import ActionMenu from '@/components/dapp/ActionMenu';
import ConfirmModal from '@/components/dapp/ConfirmModal';
import DeployDrawer from '@/components/dapp/DeployDrawer';
import UpdateSettingDrawer from '@/components/dapp/UpdateSettingsDrawer';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppList } from '@/store/slices/appSlice';

import { queryAuthToken } from '@/api/apiUtils';
import { getAppList } from '@/api/requestApp';

import { ConfirmActionType, GetAppResponseItem } from '@/types/appType';

export default function List() {
  const dispatch = useAppDispatch();
  const [organizationId, setOrganizationId] = useState('');
  const [appId, setAppId] = useState('');
  const [skipCount, setSkipCount] = useState(1);
  const [maxResultCount, setMaxResultCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [isShowFilterBox, setIsShowFilterBox] = useState(false);
  const [tempOrganizationId, setTempOrganizationId] = useState('');
  const [isShowBatchBox, setIsShowBatchBox] = useState(false);
  const [isShowAppIdActionBox, setIsShowAppIdActionBox] = useState('');
  const [actionType, setActionType] = useState<ConfirmActionType>('Stop DApp');
  const [sureConfirmAction, setSureConfirmAction] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [rowSelection, setRowSelection] = useState<GetAppResponseItem[]>([]);
  const [totalCountItems, setTotalCountItems] = useState(0);
  const [isShowDeployDrawer, setIsShowDeployDrawer] = useState(false);
  const [isShowUpdateDrawer, setIsShowUpdateDrawer] = useState(false);
  const router = useRouter();
  const appList = useAppSelector((state) => state.app.appList);

  const columns: TableColumnsType<GetAppResponseItem> = [
    { title: 'AppId', dataIndex: 'appId', key: 'appId' },
    { title: 'AppName', dataIndex: 'appName', key: 'appName' },
    {
      title: 'OrganizationName',
      dataIndex: 'organizationName',
      key: 'organizationName',
    },
    { title: 'DeployKey', dataIndex: 'deployKey', key: 'deployKey' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'CreateTime', dataIndex: 'createTime', key: 'createTime' },
    { title: 'UpdateTime', dataIndex: 'updateTime', key: 'updateTime' },
    {
      title: 'CurrentVersion',
      dataIndex: 'versions?.currentVersion',
      key: 'versions?.currentVersion',
    },
    {
      title: 'PendingVersion',
      dataIndex: 'versions?.pendingVersion',
      key: 'versions?.pendingVersion',
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      // fixed: 'right',
      render: (record) => (
        <div className='relative z-10'>
          <FileSearchOutlined
            className='text-blue-link mr-[8px] cursor-pointer text-[16px]'
            onClick={() => {
              localStorage.setItem('appId', record.appId);
              router.push(`/dapp/detail`);
            }}
          />
          <SmallDashOutlined
            onClick={() =>
              setIsShowAppIdActionBox(isShowAppIdActionBox ? '' : record.appId)
            }
            className='text-blue-link cursor-pointer text-[16px]'
          />
          <ActionMenu
            className='z-100 absolute right-[0] top-[34px] bg-white opacity-100'
            isShowBatchBox={isShowAppIdActionBox === record.appId}
            setActionType={setActionType}
            setIsShowConfirmModal={setIsShowConfirmModal}
            setIsShowDeployDrawer={setIsShowDeployDrawer}
            setIsShowUpdateDrawer={setIsShowUpdateDrawer}
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
  }, [organizationId, appId, skipCount, maxResultCount]);

  useEffect(() => {
    getAppListTemp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearFilter = useCallback(() => {
    setOrganizationId('');
    setTempOrganizationId('');
    setSkipCount(0);
    setIsShowFilterBox(false);
  }, []);

  const handleApplyFilter = useCallback(() => {
    if (!tempOrganizationId) {
      return;
    }
    setOrganizationId(tempOrganizationId);
    setSkipCount(0);
    setIsShowFilterBox(false);
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

  const handleBatchAction = useCallback(async () => {
    setSureConfirmAction(false);
  }, []);

  useEffect(() => {
    if (!sureConfirmAction) {
      return;
    }

    handleBatchAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sureConfirmAction]);

  return (
    <div className='px-[16px] pb-[28px] pt-[48px]'>
      <div className='mb-[16px] flex w-full items-center justify-between'>
        <div className='relative'>
          <Input
            placeholder='Search by ID'
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            style={{
              width: 200,
              height: 32,
              borderColor: '#E0E0E0',
              borderRadius: '8px',
              marginRight: '8px',
            }}
            prefix={<SearchOutlined className='text-[#E0E0E0]' />}
          />
          <Button
            className={clsx(
              isShowFilterBox || organizationId ? 'bg-gray-F5' : ''
            )}
            icon={<ControlOutlined />}
            onClick={() => setIsShowFilterBox(!isShowFilterBox)}
          >
            Filters
            {organizationId ? ` (1)` : ''}
          </Button>
          <div
            className={clsx(
              'border-gray-E0 absolute left-[208px] top-[40px] z-10 flex w-[388px] flex-col items-center rounded-md border border-solid bg-white p-[16px] opacity-100',
              { hidden: !isShowFilterBox }
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
                className='text-blue-link border-blue-link w-[174px] border border-solid bg-white'
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
        </div>
        <div className='relative'>
          <Button
            className='text-blue-link border-blue-link w-[174px] border border-solid bg-white'
            onClick={() => setIsShowBatchBox(!isShowBatchBox)}
            disabled={rowSelection?.length === 0}
            icon={isShowBatchBox ? <UpOutlined /> : <DownOutlined />}
            iconPosition='end'
          >
            Batch Actions
          </Button>
          <ActionMenu
            className='absolute right-[0] top-[40px]'
            isShowBatchBox={isShowBatchBox}
            setActionType={setActionType}
            setIsShowConfirmModal={setIsShowConfirmModal}
            setIsShowDeployDrawer={setIsShowDeployDrawer}
            setIsShowUpdateDrawer={setIsShowUpdateDrawer}
          />
        </div>
      </div>
      <Table
        rowKey={(record) => record.appId}
        columns={columns}
        dataSource={appList}
        loading={loading}
        scroll={{ x: 1700 }}
        className='w-full'
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
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
      />
      <ConfirmModal
        isShowConfirmModal={isShowConfirmModal}
        setIsShowConfirmModal={setIsShowConfirmModal}
        actionType={actionType}
        setSureConfirmAction={setSureConfirmAction}
      />
      <DeployDrawer
        isShowDeployDrawer={isShowDeployDrawer}
        setIsShowDeployDrawer={setIsShowDeployDrawer}
      />
      <UpdateSettingDrawer
        isShowUpdateDrawer={isShowUpdateDrawer}
        setIsShowUpdateDrawer={setIsShowUpdateDrawer}
      />
    </div>
  );
}
