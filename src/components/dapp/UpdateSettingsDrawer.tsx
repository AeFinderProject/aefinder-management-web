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
  readonly needRefresh: boolean;
  readonly setNeedRefresh: (needRefresh: boolean) => void;
};

const Option = Select.Option;

export default function UpdateSettingDrawer({
  updateType,
  appId,
  appIds,
  isShowUpdateDrawer,
  setIsShowUpdateDrawer,
  needRefresh,
  setNeedRefresh,
}: UpdateSettingDrawerProps) {
  const [maxEntityCallCount, setMaxEntityCallCount] = useState<number>();
  const [maxEntitySize, setMaxEntitySize] = useState<number>();
  const [maxLogCallCount, setMaxLogCallCount] = useState<number>();
  const [maxLogSize, setMaxLogSize] = useState<number>();
  const [maxContractCallCount, setMaxContractCallCount] = useState<number>();
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

  const handleUpdateSetting = useCallback(async () => {
    const params = {} as BatchLimitItemRequestType;
    if (updateType === 'batch') {
      params.appIds = appIds;
    }
    if (updateType === 'single') {
      params.appId = appId;
    }
    if (maxEntityCallCount) {
      params.maxEntityCallCount = maxEntityCallCount;
    }
    if (maxEntitySize) {
      params.maxEntitySize = maxEntitySize;
    }
    if (maxLogCallCount) {
      params.maxLogCallCount = maxLogCallCount;
    }
    if (maxLogSize) {
      params.maxLogSize = maxLogSize;
    }
    if (maxContractCallCount) {
      params.maxContractCallCount = maxContractCallCount;
    }
    if (appFullPodRequestCpuCore) {
      params.appFullPodRequestCpuCore = appFullPodRequestCpuCore;
    }
    if (appFullPodRequestMemory) {
      params.appFullPodRequestMemory = appFullPodRequestMemory;
    }
    if (appQueryPodRequestCpuCore) {
      params.appQueryPodRequestCpuCore = appQueryPodRequestCpuCore;
    }
    if (appQueryPodRequestMemory) {
      params.appQueryPodRequestMemory = appQueryPodRequestMemory;
    }
    if (appPodReplicas) {
      params.appPodReplicas = appPodReplicas;
    }
    if (maxAppCodeSize) {
      params.maxAppCodeSize = maxAppCodeSize;
    }
    if (maxAppAttachmentSize) {
      params.maxAppAttachmentSize = maxAppAttachmentSize;
    }
    if (enableMultipleInstances) {
      if (
        enableMultipleInstances !== 'true' &&
        enableMultipleInstances !== 'false'
      ) {
        message.info('Enter Enable Multiple Instances: true or false');
        return;
      }
      params.enableMultipleInstances = enableMultipleInstances === 'true';
    }
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
      setNeedRefresh(!needRefresh);
    }
    setLoading(false);
    handleCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    maxEntityCallCount,
    maxEntitySize,
    maxLogCallCount,
    maxLogSize,
    maxContractCallCount,
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
    handleCancel,
  ]);

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
