import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import ConfirmModal from '@/components/dapp/ConfirmModal';
import DeployDrawer from '@/components/dapp/DeployDrawer';

import { ConfirmActionType, UpdateType } from '@/types/appType';

type ActionMenuProps = {
  readonly updateType: UpdateType;
  readonly appId?: string;
  readonly version?: string;
  readonly appIds?: string[];
  readonly className?: string;
  readonly isShowBatchBox?: boolean;
  readonly setIsShowBatchBox: (isShowBatchBox: boolean) => void;
  readonly needRefresh: boolean;
  readonly setNeedRefresh: (needRefresh: boolean) => void;
};

export default function ActionMenu({
  updateType,
  appId,
  version,
  appIds,
  isShowBatchBox,
  setIsShowBatchBox,
  className,
  needRefresh,
  setNeedRefresh,
}: ActionMenuProps) {
  const [actionType, setActionType] =
    useState<ConfirmActionType>('Restart AeIndexer');
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowDeployDrawer, setIsShowDeployDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState<'Deploy' | 'Update'>('Deploy');

  const handleAction = useCallback(
    (type: ConfirmActionType) => {
      setActionType(type);
      setIsShowConfirmModal(true);
      setIsShowBatchBox(false);
    },
    [setActionType, setIsShowConfirmModal, setIsShowBatchBox]
  );

  const handleDeploy = useCallback(() => {
    setIsShowDeployDrawer(true);
    setIsShowBatchBox(false);
  }, [setIsShowDeployDrawer, setIsShowBatchBox]);

  return (
    <div
      className={clsx(
        'bg-white-normal z-10 flex w-[200px] flex-col items-center rounded-lg border border-solid bg-opacity-100',
        { hidden: !isShowBatchBox },
        className
      )}
    >
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
        onClick={() => {
          setDrawerType('Deploy');
          handleDeploy();
        }}
        className='hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
      >
        <Image
          src='/assets/svg/deploy.svg'
          alt='deploy'
          width={24}
          height={24}
        />
        <div className='ml-[8px] text-sm'>Deploy AeIndexer</div>
      </div>
      <div
        onClick={() => {
          setDrawerType('Update');
          handleDeploy();
        }}
        className='hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
      >
        <Image
          src='/assets/svg/update.svg'
          alt='update'
          width={24}
          height={24}
        />
        <div className='ml-[8px] text-sm'>Update AeIndexer</div>
      </div>
      <div
        onClick={() => handleAction('Restart AeIndexer')}
        className='hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
      >
        <Image
          src='/assets/svg/restart.svg'
          alt='restart'
          width={24}
          height={24}
        />
        <div className='ml-[8px] text-sm'>Restart AeIndexer</div>
      </div>
      <div
        onClick={() => handleAction('Pause AeIndexer')}
        className='border-gray-E0 hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start rounded-b-lg border-t border-solid p-[16px]'
      >
        <Image src='/assets/svg/pause.svg' alt='pause' width={24} height={24} />
        <div className='text-danger-normal ml-[8px] text-sm'>
          Pause AeIndexer
        </div>
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
        drawerType={drawerType}
        updateType={updateType}
        appId={appId}
        version={version}
        appIds={appIds}
        isShowDeployDrawer={isShowDeployDrawer}
        setIsShowDeployDrawer={setIsShowDeployDrawer}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />
    </div>
  );
}
