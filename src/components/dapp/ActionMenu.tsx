import { message } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import ConfirmModal from '@/components/dapp/ConfirmModal';
import DeployDrawer from '@/components/dapp/DeployDrawer';
import UpdateSettingDrawer from '@/components/dapp/UpdateSettingsDrawer';

import { ConfirmActionType } from '@/types/appType';

message.config({
  top: 100,
  duration: 2,
  maxCount: 2,
});

type ActionMenuProps = {
  readonly appIds: string[];
  readonly className: string;
  readonly isShowBatchBox: boolean;
};

export default function ActionMenu({
  appIds,
  isShowBatchBox,
  className,
}: ActionMenuProps) {
  const [actionType, setActionType] = useState<ConfirmActionType>('Stop DApp');
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
        'bg-white-normal z-11 flex w-[211px] flex-col items-center rounded-lg border border-solid bg-opacity-100',
        { hidden: !isShowBatchBox },
        className
      )}
    >
      {contextHolder}
      <div
        onClick={() => handleAction('Destroy Services')}
        className='bg-white-normal hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start rounded-t-lg p-[16px]'
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
        className='bg-white-normal hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
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
        className='bg-white-normal hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
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
        className='bg-white-normal hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
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
        onClick={() => handleAction('Stop DApp')}
        className='bg-white-normal border-gray-E0 hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start rounded-b-lg border-t border-solid p-[16px]'
      >
        <Image src='/assets/svg/stop.svg' alt='stop' width={24} height={24} />
        <div className='text-danger-normal ml-[8px] text-sm'>Stop App</div>
      </div>
      <ConfirmModal
        updateType='batch'
        appIds={appIds}
        isShowConfirmModal={isShowConfirmModal}
        setIsShowConfirmModal={setIsShowConfirmModal}
        actionType={actionType}
      />
      <DeployDrawer
        updateType='batch'
        appIds={appIds}
        isShowDeployDrawer={isShowDeployDrawer}
        setIsShowDeployDrawer={setIsShowDeployDrawer}
        messageApi={messageApi}
      />
      <UpdateSettingDrawer
        updateType='batch'
        appIds={appIds}
        isShowUpdateDrawer={isShowUpdateDrawer}
        setIsShowUpdateDrawer={setIsShowUpdateDrawer}
      />
    </div>
  );
}
