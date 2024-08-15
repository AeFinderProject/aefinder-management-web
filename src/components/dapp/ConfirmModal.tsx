import { Button, Modal } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback } from 'react';

import { ConfirmActionType } from '@/types/appType';

type ConfirmModalProps = {
  isShowConfirmModal: boolean;
  setIsShowConfirmModal: (params: boolean) => void;
  actionType: ConfirmActionType;
  setSureConfirmAction: (params: boolean) => void;
};

export default function ConfirmModal({
  isShowConfirmModal,
  setIsShowConfirmModal,
  actionType,
  setSureConfirmAction,
}: ConfirmModalProps) {
  const handleCancel = useCallback(() => {
    setIsShowConfirmModal(false);
  }, [setIsShowConfirmModal]);

  const handleOk = useCallback(() => {
    setIsShowConfirmModal(false);
    setSureConfirmAction(true);
  }, [setIsShowConfirmModal, setSureConfirmAction]);

  return (
    <Modal
      title={`Confirm ${actionType}`}
      open={isShowConfirmModal}
      onCancel={handleCancel}
      width={418}
      footer={
        <div className='flex items-center justify-between'>
          <Button
            size='large'
            className='text-blue-link border-blue-link w-[180px] border border-solid bg-white'
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            type={actionType === 'Stop DApp' ? 'default' : 'primary'}
            size='large'
            className={clsx(
              'w-[180px]',
              actionType === 'Stop DApp' &&
                'bg-danger-normal border-danger-normal border border-solid text-white'
            )}
            onClick={() => handleOk()}
          >
            {actionType}
          </Button>
        </div>
      }
    >
      {actionType === 'Stop DApp' && (
        <div className='text-center'>
          <Image
            src='/assets/svg/stop-dapp.svg'
            alt='stop-dapp'
            width={90}
            height={108}
            className='mx-auto my-[16px]'
          />
          <div className='text-gray-80 text-left text-[16px]'>
            Are you sure you want to stop this DApp? It will be unavailable for
            users after this action.
          </div>
        </div>
      )}
      {actionType === 'Restart DApp' && (
        <div className='text-center'>
          <Image
            src='/assets/svg/restart-dapp.svg'
            alt='restart-dapp'
            width={92}
            height={108}
            className='mx-auto my-[16px]'
          />
          <div className='text-gray-80 text-left text-[16px]'>
            Are you sure you want to restart this DApp?
          </div>
        </div>
      )}
      {actionType === 'Destroy Services' && (
        <div className='text-center'>
          <Image
            src='/assets/svg/destroy-services.svg'
            alt='destroy-services'
            width={125}
            height={108}
            className='mx-auto my-[16px]'
          />
          <div className='text-gray-80 text-left text-[16px]'>
            Are you sure you want to destroy services for this DApp?
          </div>
        </div>
      )}
    </Modal>
  );
}
