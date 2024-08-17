import { DeleteOutlined } from '@ant-design/icons';
import { Divider, Tooltip } from 'antd';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import ConfirmModal from './ConfirmModal';
import DeployDrawer from './DeployDrawer';
import UpdateSettingDrawer from './UpdateSettingsDrawer';

import { ConfirmActionType } from '@/types/appType';

type ActionMenuItemProps = {
  readonly appId?: string;
  readonly version?: string;
  readonly needRefresh: boolean;
  readonly setNeedRefresh: (needRefresh: boolean) => void;
};

export default function ActionMenuItem({
  appId,
  version,
  needRefresh,
  setNeedRefresh,
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
      <Tooltip title='Pause App'>
        <Image
          src='/assets/svg/pause.svg'
          alt='pause'
          width={24}
          height={24}
          onClick={() => handleAction('Pause DApp')}
          className='cursor-pointer'
        />
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title='Stop App'>
        <DeleteOutlined
          onClick={() => handleAction('Stop DApp')}
          className='text-danger-normal cursor-pointer text-[20px] font-medium'
        />
      </Tooltip>
      <ConfirmModal
        updateType='single'
        appId={appId}
        version={version}
        isShowConfirmModal={isShowConfirmModal}
        setIsShowConfirmModal={setIsShowConfirmModal}
        actionType={actionType}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
      <DeployDrawer
        updateType='single'
        appId={appId}
        version={version}
        isShowDeployDrawer={isShowDeployDrawer}
        setIsShowDeployDrawer={setIsShowDeployDrawer}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
      <UpdateSettingDrawer
        updateType='single'
        appId={appId}
        isShowUpdateDrawer={isShowUpdateDrawer}
        setIsShowUpdateDrawer={setIsShowUpdateDrawer}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
    </div>
  );
}
