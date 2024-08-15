import clsx from 'clsx';
import Image from 'next/image';
import { useCallback } from 'react';

import { ConfirmActionType } from '@/types/appType';

type ActionMenuProps = {
  className: string;
  isShowBatchBox: boolean;
  setActionType: (type: ConfirmActionType) => void;
  setIsShowConfirmModal: (param: boolean) => void;
  setIsShowDeployDrawer: (param: boolean) => void;
  setIsShowUpdateDrawer: (param: boolean) => void;
};

export default function ActionMenu({
  setActionType,
  setIsShowConfirmModal,
  setIsShowDeployDrawer,
  setIsShowUpdateDrawer,
  isShowBatchBox,
  className,
}: ActionMenuProps) {
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
        'border-gray-E0 z-10 flex w-[211px] flex-col items-center rounded-md border border-solid bg-white opacity-100',
        { hidden: !isShowBatchBox },
        className
      )}
    >
      <div
        onClick={() => handleAction('Destroy Services')}
        className='hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start p-[16px]'
      >
        <Image
          src='/assets/svg/destroy.svg'
          alt='destroy'
          width={24}
          height={24}
          className='text-blue-link'
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
          className='text-blue-link'
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
          className='text-blue-link'
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
          className='text-blue-link'
        />
        <div className='ml-[8px] text-sm'>Restart App</div>
      </div>
      <div
        onClick={() => handleAction('Stop DApp')}
        className='border-gray-E0 hover:bg-gray-F5 flex w-full cursor-pointer items-center justify-start border-t border-solid p-[16px]'
      >
        <Image
          src='/assets/svg/stop.svg'
          alt='stop'
          width={24}
          height={24}
          className='text-blue-link'
        />
        <div className='text-danger-normal ml-[8px] text-sm'>Stop App</div>
      </div>
    </div>
  );
}
