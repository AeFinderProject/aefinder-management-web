import { Divider, Tooltip } from 'antd';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import ConfirmModal from './ConfirmModal';
import DeployDrawer from './DeployDrawer';

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
  const [actionType, setActionType] =
    useState<ConfirmActionType>('Stop AeIndexer');
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowDeployDrawer, setIsShowDeployDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState<'Deploy' | 'Update'>('Deploy');

  const handleAction = useCallback((type: ConfirmActionType) => {
    setActionType(type);
    setIsShowConfirmModal(true);
  }, []);

  return (
    <div className='bg-white-normal flex items-center justify-end rounded-[8px] p-[8px]'>
      <Tooltip title='Deploy AeIndexer'>
        <Image
          src='/assets/svg/deploy.svg'
          alt='deploy'
          width={24}
          height={24}
          onClick={() => {
            setDrawerType('Deploy');
            setIsShowDeployDrawer(true);
          }}
          className='cursor-pointer'
        />
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title='Update AeIndexer'>
        <Image
          src='/assets/svg/update.svg'
          alt='update'
          width={24}
          height={24}
          onClick={() => {
            setDrawerType('Update');
            setIsShowDeployDrawer(true);
          }}
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
      <Tooltip title='Restart AeIndexer'>
        <Image
          src='/assets/svg/restart.svg'
          alt='restart'
          width={24}
          height={24}
          onClick={() => handleAction('Restart AeIndexer')}
          className='cursor-pointer'
        />
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title='Pause AeIndexer'>
        <Image
          src='/assets/svg/pause.svg'
          alt='pause'
          width={24}
          height={24}
          onClick={() => handleAction('Pause AeIndexer')}
          className='cursor-pointer'
        />
      </Tooltip>
      <Divider type='vertical' />
      <Tooltip title='Stop AeIndexer'>
        <Image
          src='/assets/svg/stop.svg'
          alt='stop'
          width={24}
          height={24}
          onClick={() => handleAction('Stop AeIndexer')}
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
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
      <DeployDrawer
        drawerType={drawerType}
        updateType='single'
        appId={appId}
        version={version}
        isShowDeployDrawer={isShowDeployDrawer}
        setIsShowDeployDrawer={setIsShowDeployDrawer}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
    </div>
  );
}
