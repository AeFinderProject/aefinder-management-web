import { Button, Divider, Drawer, Input, message, Select } from 'antd';
import { useCallback, useState } from 'react';

import {
  batchDeployApp,
  batchUpdateApp,
  deployApp,
  updateApp,
} from '@/api/requestApp';

import {
  BatchDeployRequestType,
  DeployAppRequestType,
  UpdateType,
} from '@/types/appType';

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

const Option = Select.Option;

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
  const [isUpdateConfig, setIsUpdateConfig] = useState('false');
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleCancel = useCallback(() => {
    setIsShowDeployDrawer(false);
    setDockerImage('');
    setIsUpdateConfig('');
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

    if (isUpdateConfig) {
      if (isUpdateConfig !== 'true' && isUpdateConfig !== 'false') {
        message.info('Update Config: true or false');
        return;
      }
    }

    if (updateType === 'batch' && appIds?.length) {
      const param: BatchDeployRequestType = {
        appIds: appIds,
        imageName: dockerImage,
      };
      if (isUpdateConfig) {
        param.isUpdateConfig = isUpdateConfig === 'true';
      }
      setUploadLoading(true);
      const res = await batchUpdateApp(param);
      if (res) {
        message.success({
          content: 'batchUpdate success',
          key: 'Update',
        });
        setDockerImage('');
        setIsUpdateConfig('');
        setNeedRefresh(!needRefresh);
      }
    }

    if (updateType === 'single' && appId && version) {
      const param: DeployAppRequestType = {
        appId: appId,
        version: version,
        imageName: dockerImage,
      };
      if (isUpdateConfig) {
        param.isUpdateConfig = isUpdateConfig === 'true';
      }
      setUploadLoading(true);
      const res = await updateApp(param);
      if (res) {
        message.success({
          content: 'Update success',
          key: 'Update',
        });
        setDockerImage('');
        setIsUpdateConfig('');
        setNeedRefresh(!needRefresh);
      }
    }

    setUploadLoading(false);
    setIsShowDeployDrawer(false);
    return () => {
      setDockerImage('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dockerImage,
    isUpdateConfig,
    setIsShowDeployDrawer,
    updateType,
    appId,
    version,
    appIds,
  ]);

  return (
    <Drawer
      title={drawerType}
      open={isShowDeployDrawer}
      onClose={() => handleCancel()}
      destroyOnClose={true}
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
        {drawerType === 'Update' && (
          <div>
            <div className='text-dark-normal mb-[8px] mt-[16px] text-[16px]'>
              Update Config
            </div>
            <Select
              placeholder='Update Config: true or false'
              value={isUpdateConfig}
              onChange={(value) => setIsUpdateConfig(value)}
              className='border-gray-E0 w-full rounded-[8px]'
              size='large'
            >
              <Option value='false'>false</Option>
              <Option value='true'>true</Option>
            </Select>
          </div>
        )}
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
