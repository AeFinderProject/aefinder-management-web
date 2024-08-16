import { Divider, message, Tooltip } from 'antd';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import ConfirmModal from './ConfirmModal';
import DeployDrawer from './DeployDrawer';
import UpdateSettingDrawer from './UpdateSettingsDrawer';

import { ConfirmActionType } from '@/types/appType';

message.config({
  top: 100,
  duration: 2,
  maxCount: 2,
});

type ActionMenuItemProps = {
  readonly appId?: string;
  readonly version?: string;
};

export default function ActionMenuItem({
  appId,
  version,
}: ActionMenuItemProps) {
  const [actionType, setActionType] = useState<ConfirmActionType>('Stop DApp');
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowDeployDrawer, setIsShowDeployDrawer] = useState(false);
  const [isShowUpdateDrawer, setIsShowUpdateDrawer] = useState(false);

  const handleAction = useCallback((type: ConfirmActionType) => {
    setActionType(type);
    setIsShowConfirmModal(true);
  }, []);

  return (
    <div className='bg-white-normal flex items-center justify-end rounded-[8px] p-[8px]'>
      <Tooltip title='Deploy App'>
        <Image
          src='/assets/svg/deploy.svg'
          alt='deploy'
          width={24}
          height={24}
          onClick={() => setIsShowDeployDrawer(true)}
          className='cursor-pointer'
        />
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title='Destroy Services'>
        <Image
          src='/assets/svg/destroy.svg'
          alt='destroy'
          width={24}
          height={24}
          onClick={() => handleAction('Destroy Services')}
          className='cursor-pointer'
        />
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title='Update Settings'>
        <Image
          src='/assets/svg/update.svg'
          alt='update'
          width={24}
          height={24}
          onClick={() => setIsShowUpdateDrawer(true)}
          className='cursor-pointer'
        />
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title='Restart App'>
        <Image
          src='/assets/svg/restart.svg'
          alt='restart'
          width={24}
          height={24}
          onClick={() => handleAction('Restart DApp')}
          className='cursor-pointer'
        />
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title='Stop App'>
        <Image
          src='/assets/svg/stop.svg'
          alt='stop'
          width={24}
          height={24}
          onClick={() => handleAction('Stop DApp')}
          className='cursor-pointer'
        />
      </Tooltip>
      <ConfirmModal
        updateType='single'
        appId={appId}
        version={version}
        isShowConfirmModal={isShowConfirmModal}
        setIsShowConfirmModal={setIsShowConfirmModal}
        actionType={actionType}
      />
      <DeployDrawer
        updateType='single'
        appId={appId}
        version={version}
        isShowDeployDrawer={isShowDeployDrawer}
        setIsShowDeployDrawer={setIsShowDeployDrawer}
      />
      <UpdateSettingDrawer
        updateType='single'
        appId={appId}
        isShowUpdateDrawer={isShowUpdateDrawer}
        setIsShowUpdateDrawer={setIsShowUpdateDrawer}
      />
    </div>
  );
}
