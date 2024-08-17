import { Button, Divider, Drawer, Input, message } from 'antd';
import { useCallback, useState } from 'react';

import { batchDeployApp, deployApp } from '@/api/requestApp';

import { UpdateType } from '@/types/appType';

type DeployDrawerProps = {
  readonly updateType: UpdateType;
  readonly appId?: string;
  readonly version?: string;
  readonly appIds?: string[];
  readonly isShowDeployDrawer: boolean;
  readonly setIsShowDeployDrawer: (params: boolean) => void;
  readonly needRefresh: boolean;
  readonly setNeedRefresh: (needRefresh: boolean) => void;
};

export default function DeployDrawer({
  updateType,
  appId,
  version,
  appIds,
  isShowDeployDrawer,
  setIsShowDeployDrawer,
  needRefresh,
  setNeedRefresh,
}: DeployDrawerProps) {
  const [dockerImage, setDockerImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    setIsShowDeployDrawer(false);
    setDockerImage('');
  }, [setIsShowDeployDrawer]);

  const handleDeploy = useCallback(async () => {
    if (!dockerImage) {
      message.warning('please enter docker image');
      return;
    }
    setLoading(true);
    if (updateType === 'batch' && appIds?.length) {
      const res = await batchDeployApp({
        appIds: appIds,
        imageName: dockerImage,
      });
      if (res) {
        message.success({
          content: 'batchDeploy success',
          key: 'Deploy',
        });
        setDockerImage('');
        setNeedRefresh(!needRefresh);
      }
    }

    if (updateType === 'single' && appId && version) {
      const res = await deployApp({
        appId: appId,
        version: version,
        imageName: dockerImage,
      });
      if (!res) {
        message.success({
          content: 'Deploy success',
          key: 'Deploy',
        });
        setDockerImage('');
        setNeedRefresh(!needRefresh);
      }
    }

    setLoading(false);
    setIsShowDeployDrawer(false);
    return () => {
      setDockerImage('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dockerImage, setIsShowDeployDrawer, updateType, appId, version, appIds]);

  return (
    <Drawer
      title='Deploy'
      open={isShowDeployDrawer}
      onClose={() => handleCancel()}
      zIndex={10000}
    >
      <div>
        <div className='text-dark-normal mb-[8px] text-[16px]'>
          Docker Image
        </div>
        <Input
          placeholder='Enter Docker image'
          value={dockerImage}
          onChange={(e) => setDockerImage(e.target.value)}
          className='border-gray-E0 w-full rounded-[8px]'
        />
        <Divider />
        <div className='flex w-full justify-between'>
          <Button
            type='default'
            size='large'
            className='text-blue-link border-blue-link w-[160px] border border-solid bg-white'
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            size='large'
            className='w-[160px]'
            loading={loading}
            onClick={() => handleDeploy()}
          >
            Deploy
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
