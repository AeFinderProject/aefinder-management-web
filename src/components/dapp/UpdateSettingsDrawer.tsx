import { Button, Divider, Drawer, Input } from 'antd';
import { useCallback, useState } from 'react';

type UpdateSettingDrawerProps = {
  isShowUpdateDrawer: boolean;
  setIsShowUpdateDrawer: (params: boolean) => void;
};

export default function UpdateSettingDrawer({
  isShowUpdateDrawer,
  setIsShowUpdateDrawer,
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
  const [appQueryPodRequestMemoryp, setAppQueryPodRequestMemoryp] =
    useState('');
  const [appPodReplicas, setAppPodReplicas] = useState('');

  const handleCancel = useCallback(() => {
    setIsShowUpdateDrawer(false);
  }, [setIsShowUpdateDrawer]);

  return (
    <Drawer
      title='Update Settings'
      open={isShowUpdateDrawer}
      onClose={() => handleCancel()}
      width={978}
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
          <div className='text-dark-normal mb-[8px] text-[16px]'>
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
            App Full Pod Request CPU Core
          </div>
          <Input
            placeholder='Enter App Full Pod Request CPU Core'
            value={appFullPodRequestCpuCore}
            onChange={(e) => setAppFullPodRequestCpuCore(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
      </div>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            App Full Pod Request Memory
          </div>
          <Input
            placeholder='Enter App Full Pod Request Memory'
            value={appQueryPodRequestMemoryp}
            onChange={(e) => setAppQueryPodRequestMemoryp(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            App Query Pod Request CPU Core
          </div>
          <Input
            placeholder='Enter App Query Pod Request CPU Core'
            value={appQueryPodRequestCpuCore}
            onChange={(e) => setAppQueryPodRequestCpuCore(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
      </div>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            App Query Pod Request Memory
          </div>
          <Input
            placeholder='Enter App Full Pod Request Memory'
            value={appFullPodRequestMemory}
            onChange={(e) => setAppFullPodRequestMemory(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
        <div className='w-[49%]'>
          <div className='text-dark-normal mb-[8px] text-[16px]'>
            App Pod Replicas
          </div>
          <Input
            placeholder='Enter App Pod Replicas'
            value={appPodReplicas}
            onChange={(e) => setAppPodReplicas(e.target.value)}
            className='border-gray-E0 w-full rounded-[8px]'
          />
        </div>
      </div>
      <Divider />
      <div className='flex w-full justify-start'>
        <Button
          type='default'
          size='large'
          className='text-blue-link border-blue-link mr-[8px] w-[160px] border border-solid bg-white'
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button
          type='primary'
          size='large'
          className='w-[160px]'
          onClick={() => {
            console.log('Deploy');
          }}
        >
          Deploy
        </Button>
      </div>
    </Drawer>
  );
}
