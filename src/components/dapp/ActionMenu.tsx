import { message } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import ConfirmModal from '@/components/dapp/ConfirmModal';
import DeployDrawer from '@/components/dapp/DeployDrawer';
import UpdateSettingDrawer from '@/components/dapp/UpdateSettingsDrawer';

import { ConfirmActionType, UpdateType } from '@/types/appType';

message.config({
  top: 100,
  duration: 2,
  maxCount: 2,
});

type ActionMenuProps = {
  readonly updateType: UpdateType;
  readonly appId?: string;
  readonly version?: string;
  readonly appIds?: string[];
  readonly className?: string;
  readonly isShowBatchBox?: boolean;
  readonly needRefresh: boolean;
  readonly setNeedRefresh: (needRefresh: boolean) => void;
};

export default function ActionMenu({
  updateType,
  appId,
  version,
  appIds,
  isShowBatchBox = true,
  className,
  needRefresh,
  setNeedRefresh,
}: ActionMenuProps) {
  const [actionType, setActionType] =
    useState<ConfirmActionType>('Restart DApp');
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowDeployDrawer, setIsShowDeployDrawer] = useState(false);
  const [isShowUpdateDrawer, setIsShowUpdateDrawer] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleAction = useCallback(
    (type: ConfirmActionType) => {
      setActionType(type);
      setIsShowConfirmModal(true);
    },
    [setActionType, setIsShowConfirmModal]
  );

  return (
    <div
      className={clsx(
        'bg-white-normal z-10 flex w-[200px] flex-col items-center rounded-lg border border-solid bg-opacity-100',
        { hidden: !isShowBatchBox },
        className
      )}
    >
      {contextHolder}
      <div
        onClick={() => handleAction('Destroy Services')}
        className='hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start rounded-t-lg p-[16px]'
      >
        <Image
          src='/assets/svg/destroy.svg'
          alt='destroy'
          width={24}
          height={24}
        />
        <div className='ml-[8px] text-sm'>Destroy Services</div>
      </div>
      <div
        onClick={() => setIsShowDeployDrawer(true)}
        className='hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
      >
        <Image
          src='/assets/svg/deploy.svg'
          alt='deploy'
          width={24}
          height={24}
        />
        <div className='ml-[8px] text-sm'>Deploy App</div>
      </div>
      <div
        onClick={() => setIsShowUpdateDrawer(true)}
        className='hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
      >
        <Image
          src='/assets/svg/update.svg'
          alt='update'
          width={24}
          height={24}
        />
        <div className='ml-[8px] text-sm'>Update Settings</div>
      </div>
      <div
        onClick={() => handleAction('Restart DApp')}
        className='hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
      >
        <Image
          src='/assets/svg/restart.svg'
          alt='restart'
          width={24}
          height={24}
        />
        <div className='ml-[8px] text-sm'>Restart App</div>
      </div>
      <div
        onClick={() => handleAction('Pause DApp')}
        className='border-gray-E0 hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start rounded-b-lg border-t border-solid p-[16px]'
      >
        <Image src='/assets/svg/pause.svg' alt='pause' width={24} height={24} />
        <div className='text-danger-normal ml-[8px] text-sm'>Pause App</div>
      </div>
      <ConfirmModal
        updateType={updateType}
        appId={appId}
        version={version}
        appIds={appIds}
        isShowConfirmModal={isShowConfirmModal}
        setIsShowConfirmModal={setIsShowConfirmModal}
        actionType={actionType}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
      <DeployDrawer
        updateType={updateType}
        appId={appId}
        version={version}
        appIds={appIds}
        isShowDeployDrawer={isShowDeployDrawer}
        setIsShowDeployDrawer={setIsShowDeployDrawer}
        messageApi={messageApi}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
      <UpdateSettingDrawer
        updateType={updateType}
        appId={appId}
        appIds={appIds}
        isShowUpdateDrawer={isShowUpdateDrawer}
        setIsShowUpdateDrawer={setIsShowUpdateDrawer}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
    </div>
  );
}
