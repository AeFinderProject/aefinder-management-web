import { Button, Divider, Drawer, Input, message } from 'antd';
import { useCallback, useState } from 'react';

import {
  batchDeployApp,
  batchUpdateApp,
  deployApp,
  updateApp,
} from '@/api/requestApp';

import { UpdateType } from '@/types/appType';

type DeployDrawerProps = {
  readonly drawerType?: 'Deploy' | 'Update';
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
  drawerType = 'Deploy',
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
  const [uploadLoading, setUploadLoading] = useState(false);

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

  const handleUpdate = useCallback(async () => {
    if (!dockerImage) {
      message.warning('please enter docker image');
      return;
    }

    setUploadLoading(true);

    if (updateType === 'batch' && appIds?.length) {
      const res = await batchUpdateApp({
        appIds: appIds,
        imageName: dockerImage,
      });
      if (res) {
        message.success({
          content: 'batchUpdate success',
          key: 'Update',
        });
        setDockerImage('');
        setNeedRefresh(!needRefresh);
      }
    }

    if (updateType === 'single' && appId && version) {
      const res = await updateApp({
        appId: appId,
        version: version,
        imageName: dockerImage,
      });
      console.log(res);
      if (res) {
        message.success({
          content: 'Update success',
          key: 'Update',
        });
        setDockerImage('');
        setNeedRefresh(!needRefresh);
      }
    }

    setUploadLoading(false);
    setIsShowDeployDrawer(false);
    return () => {
      setDockerImage('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dockerImage, setIsShowDeployDrawer, updateType, appId, version, appIds]);

  return (
    <Drawer
      title={drawerType}
      open={isShowDeployDrawer}
      onClose={() => handleCancel()}
    >
      <div>
        <div className='text-dark-normal mb-[8px] text-[16px]'>
          {drawerType} Docker Image
        </div>
        <Input
          placeholder={`Enter ${drawerType} Docker image`}
          value={dockerImage}
          onChange={(e) => setDockerImage(e.target.value)}
          className='border-gray-E0 w-full rounded-[8px]'
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
          {drawerType === 'Deploy' && (
            <Button
              type='primary'
              size='large'
              className='w-[160px]'
              loading={loading}
              onClick={() => handleDeploy()}
            >
              Deploy
            </Button>
          )}
          {drawerType === 'Update' && (
            <Button
              type='primary'
              size='large'
              className='w-[160px]'
              loading={uploadLoading}
              onClick={() => handleUpdate()}
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
}
