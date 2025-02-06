import { Button, Divider, Drawer, Input, message, Select } from 'antd';
import { useCallback, useState } from 'react';

import { batchSetAppLimit, setAppLimit } from '@/api/requestApp';

import {
  BatchLimitItemRequestType,
  SetAppLimitRequestType,
  UpdateType,
} from '@/types/appType';

type UpdateSettingDrawerProps = {
  readonly updateType: UpdateType;
  readonly appId?: string;
  readonly appIds?: string[];
  readonly isShowUpdateDrawer: boolean;
  readonly setIsShowUpdateDrawer: (params: boolean) => void;
};

const Option = Select.Option;

export default function UpdateSettingDrawer({
  updateType,
  appId,
  appIds,
  isShowUpdateDrawer,
  setIsShowUpdateDrawer,
}: UpdateSettingDrawerProps) {
  const [maxEntityCallCount, setMaxEntityCallCount] = useState<number>();
  const [maxEntitySize, setMaxEntitySize] = useState<number>();
  const [maxLogCallCount, setMaxLogCallCount] = useState<number>();
  const [maxLogSize, setMaxLogSize] = useState<number>();
  const [maxContractCallCount, setMaxContractCallCount] = useState<number>();
  const [appFullPodLimitCpuCore, setAppFullPodLimitCpuCore] = useState('');
  const [appFullPodLimitMemory, setAppFullPodLimitMemory] = useState('');
  const [appFullPodRequestCpuCore, setAppFullPodRequestCpuCore] = useState('');
  const [appFullPodRequestMemory, setAppFullPodRequestMemory] = useState('');
  const [appQueryPodRequestCpuCore, setAppQueryPodRequestCpuCore] =
    useState('');
  const [appQueryPodRequestMemory, setAppQueryPodRequestMemory] = useState('');
  const [appPodReplicas, setAppPodReplicas] = useState<number>();
  const [maxAppCodeSize, setMaxAppCodeSize] = useState<number>();
  const [maxAppAttachmentSize, setMaxAppAttachmentSize] = useState<number>();
  const [enableMultipleInstances, setEnableMultipleInstances] =
    useState<string>();
  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    setMaxEntityCallCount(undefined);
    setMaxEntitySize(undefined);
    setMaxLogCallCount(undefined);
    setMaxLogSize(undefined);
    setMaxContractCallCount(undefined);
    setAppFullPodLimitCpuCore('');
    setAppFullPodLimitMemory('');
    setAppFullPodRequestCpuCore('');
    setAppFullPodRequestMemory('');
    setAppQueryPodRequestCpuCore('');
    setAppQueryPodRequestMemory('');
    setAppPodReplicas(undefined);
    setIsShowUpdateDrawer(false);
    setMaxAppCodeSize(undefined);
    setMaxAppAttachmentSize(undefined);
    setEnableMultipleInstances(undefined);
  }, [setIsShowUpdateDrawer]);

  const prepareParams = useCallback(() => {
    const params = {
      maxEntityCallCount,
      maxEntitySize,
      maxLogCallCount,
      maxLogSize,
      maxContractCallCount,
      appFullPodLimitCpuCore,
      appFullPodLimitMemory,
      appFullPodRequestCpuCore,
      appFullPodRequestMemory,
      appQueryPodRequestCpuCore,
      appQueryPodRequestMemory,
      appPodReplicas,
      maxAppCodeSize,
      maxAppAttachmentSize,
      enableMultipleInstances,
    } as BatchLimitItemRequestType;

    if (updateType === 'batch') {
      params.appIds = appIds;
    }
    if (updateType === 'single') {
      params.appId = appId;
    }

    // Remove keys with empty string values
    return Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '')
    );
  }, [
    maxEntityCallCount,
    maxEntitySize,
    maxLogCallCount,
    maxLogSize,
    maxContractCallCount,
    appFullPodLimitCpuCore,
    appFullPodLimitMemory,
    appFullPodRequestCpuCore,
    appFullPodRequestMemory,
    appQueryPodRequestCpuCore,
    appQueryPodRequestMemory,
    appPodReplicas,
    maxAppCodeSize,
    maxAppAttachmentSize,
    enableMultipleInstances,
    updateType,
    appId,
    appIds,
  ]);

  const handleUpdateSetting = useCallback(async () => {
    const params = prepareParams() ?? {};

    setLoading(true);
    let res = null;
    if (updateType === 'batch') {
      res = await batchSetAppLimit(params);
    }
    if (updateType === 'single') {
      res = await setAppLimit(params as SetAppLimitRequestType);
    }
    if (res) {
      message.success('UpdateSetting Success');
    }

    setTimeout(() => {
      setLoading(false);
      handleCancel();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateType, handleCancel, prepareParams]);

  return (
    <Drawer
      title='Update Settings'
      open={isShowUpdateDrawer}
      onClose={() => handleCancel()}
      width={978}
      destroyOnClose
    >
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            Max Entity Call Count
          </div>
          <Input
            placeholder='Enter Max Entity Call Count'
            value={maxEntityCallCount}
            onChange={(e) => setMaxEntityCallCount(Number(e.target.value))}
            className='border-gray-E0 w-full rounded-[8px]'
            type='number'
          />
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            Max Entity Size
          </div>
          <Input
            placeholder='Enter Max Entity Size'
            value={maxEntitySize}
            onChange={(e) => setMaxEntitySize(Number(e.target.value))}
            className='border-gray-E0 w-full rounded-[8px]'
            type='number'
          />
        </div>
      </div>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            Max Log Call Count
          </div>
          <Input
            placeholder='Enter Max Log Call Count'
            value={maxLogCallCount}
            onChange={(e) => setMaxLogCallCount(Number(e.target.value))}
            className='border-gray-E0 w-full rounded-[8px]'
            type='number'
          />
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            Max Log Size
          </div>
          <Input
            placeholder='Enter Max Log Size'
            value={maxLogSize}
            onChange={(e) => setMaxLogSize(Number(e.target.value))}
            className='border-gray-E0 w-full rounded-[8px]'
            type='number'
          />
        </div>
      </div>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[14px] sm:text-[16px]'>
            Max Contract Call Count
          </div>
          <Input
            placeholder='Enter Max Contract Call Count'
            value={maxContractCallCount}
            onChange={(e) => setMaxContractCallCount(Number(e.target.value))}
            className='border-gray-E0 w-full rounded-[8px]'
            type='number'
          />
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            AeIndexer Pod Replicas
          </div>
          <Input
            placeholder='Enter AeIndexer Pod Replicas'
            value={appPodReplicas}
            onChange={(e) => setAppPodReplicas(Number(e.target.value))}
            className='border-gray-E0 w-full rounded-[8px]'
            type='number'
          />
        </div>
      </div>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            AeIndexer Full Pod Limit CPU Core
          </div>
          <Input
            placeholder='Enter AeIndexer Full Pod Limit CPU Core'
            value={appFullPodLimitCpuCore}
            onChange={(e) => setAppFullPodLimitCpuCore(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            AeIndexer Full Pod Limit Memory
          </div>
          <Input
            placeholder='Enter AeIndexer Full Pod Limit Memory'
            value={appFullPodLimitMemory}
            onChange={(e) => setAppFullPodLimitMemory(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
      </div>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            AeIndexer Full Pod Request CPU Core
          </div>
          <Input
            placeholder='Enter AeIndexer Full Pod Request CPU Core'
            value={appFullPodRequestCpuCore}
            onChange={(e) => setAppFullPodRequestCpuCore(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            AeIndexer Full Pod Request Memory
          </div>
          <Input
            placeholder='Enter AeIndexer Full Pod Request Memory'
            value={appFullPodRequestMemory}
            onChange={(e) => setAppFullPodRequestMemory(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
      </div>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            AeIndexer Query Pod Request CPU Core
          </div>
          <Input
            placeholder='Enter AeIndexer Query Pod Request CPU Core'
            value={appQueryPodRequestCpuCore}
            onChange={(e) => setAppQueryPodRequestCpuCore(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            AeIndexer Query Pod Request Memory
          </div>
          <Input
            placeholder='Enter AeIndexer Query Pod Request Memory'
            value={appQueryPodRequestMemory}
            onChange={(e) => setAppQueryPodRequestMemory(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
      </div>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            Max AeIndexer Code Size [Byte]
          </div>
          <Input
            placeholder='Enter Max AeIndexer Code Size'
            value={maxAppCodeSize}
            onChange={(e) => setMaxAppCodeSize(Number(e.target.value))}
            className='border-gray-E0 w-full rounded-[8px]'
            type='number'
          />
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            Max AeIndexer Attachment Size [Byte]
          </div>
          <Input
            placeholder='Enter Max AeIndexer Attachment Size'
            value={maxAppAttachmentSize}
            onChange={(e) => setMaxAppAttachmentSize(Number(e.target.value))}
            className='border-gray-E0 w-full rounded-[8px]'
            type='number'
          />
        </div>
      </div>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            Enable Multiple Instances
          </div>
          <Select
            placeholder='Select Enable Multiple Instances'
            value={enableMultipleInstances}
            onChange={(value) => setEnableMultipleInstances(value)}
            className='border-gray-E0 w-full rounded-[8px]'
            size='large'
          >
            <Option value='false'>false</Option>
            <Option value='true'>true</Option>
          </Select>
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'></div>
        </div>
      </div>
      <Divider />
      <div className='flex w-full justify-start'>
        <Button
          type='default'
          size='large'
          className='text-blue-link border-blue-link bg-white-normal mr-[8px] w-[160px] border border-solid'
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button
          type='primary'
          size='large'
          className='w-[160px]'
          loading={loading}
          onClick={() => handleUpdateSetting()}
        >
          Update
        </Button>
      </div>
    </Drawer>
  );
}
