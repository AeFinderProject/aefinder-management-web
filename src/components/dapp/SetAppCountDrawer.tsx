import { Button, Divider, Drawer, Input, message } from 'antd';
import { useCallback, useState } from 'react';

import { setMaxAppCountApi } from '@/api/requestApp';

type DeployDrawerProps = {
  readonly organizationId: string;
  readonly isShowChangeAppCountDrawer: boolean;
  readonly setIsShowChangeAppCountDrawer: (params: boolean) => void;
  readonly needRefresh: boolean;
  readonly setNeedRefresh: (needRefresh: boolean) => void;
};

export default function SetAppCountDrawer({
  organizationId,
  isShowChangeAppCountDrawer,
  setIsShowChangeAppCountDrawer,
  needRefresh,
  setNeedRefresh,
}: DeployDrawerProps) {
  const [maxAppCount, setMaxAppCount] = useState<number>();
  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    setIsShowChangeAppCountDrawer(false);
    setMaxAppCount(undefined);
  }, [setIsShowChangeAppCountDrawer, setMaxAppCount]);

  const handleSetMaxAppCount = useCallback(async () => {
    if (!maxAppCount) {
      message.warning('please enter max AeIndexer code count');
      return;
    }

    setLoading(true);

    const res = await setMaxAppCountApi({
      organizationId,
      maxAppCount,
    });
    if (res) {
      message.success({
        content: 'Set max AeIndexer count success',
        key: 'Set',
      });
      setMaxAppCount(undefined);
      setNeedRefresh(!needRefresh);
    }

    setLoading(false);
    setIsShowChangeAppCountDrawer(false);
    return () => {
      setMaxAppCount(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId, maxAppCount, needRefresh]);

  return (
    <Drawer
      title='Set Max AeIndexer Count'
      open={isShowChangeAppCountDrawer}
      onClose={() => handleCancel()}
      destroyOnClose={true}
    >
      <div>
        <div className='text-dark-normal mb-[8px] text-[16px]'>
          Max AeIndexer Count
        </div>
        <Input
          placeholder='Enter Max AeIndexer Count'
          value={maxAppCount}
          onChange={(e) => setMaxAppCount(Number(e.target.value))}
          className='border-gray-E0 w-full rounded-[8px]'
          type='number'
        />
        <Divider />
        <div className='flex w-full justify-between'>
          <Button
            type='default'
            size='large'
            className='text-blue-link border-blue-link bg-white-normal w-[160px] border border-solid'
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            size='large'
            className='w-[160px]'
            loading={loading}
            onClick={() => handleSetMaxAppCount()}
          >
            Set
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
