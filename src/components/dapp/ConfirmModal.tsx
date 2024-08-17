import { PauseCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import {
  batchDestroyApp,
  batchPauseApp,
  batchRestartApp,
  destroyApp,
  pauseApp,
  restartApp,
  stopApp,
} from '@/api/requestApp';

import { ConfirmActionType, UpdateType } from '@/types/appType';

type ConfirmModalProps = {
  readonly updateType: UpdateType;
  readonly appId?: string;
  readonly version?: string;
  readonly appIds?: string[];
  readonly actionType: ConfirmActionType;
  readonly isShowConfirmModal: boolean;
  readonly setIsShowConfirmModal: (params: boolean) => void;
  readonly needRefresh: boolean;
  readonly setNeedRefresh: (needRefresh: boolean) => void;
};

export default function ConfirmModal({
  updateType,
  appId,
  version,
  appIds,
  actionType,
  isShowConfirmModal,
  setIsShowConfirmModal,
  needRefresh,
  setNeedRefresh,
}: ConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    setIsShowConfirmModal(false);
  }, [setIsShowConfirmModal]);

  const handleAction = useCallback(async () => {
    let res = null;
    setLoading(true);
    if (updateType === 'batch' && appIds) {
      if (actionType === 'Destroy Services') {
        res = await batchDestroyApp({ appIds: appIds });
      } else if (actionType === 'Restart DApp') {
        res = await batchRestartApp({ appIds: appIds });
      } else if (actionType === 'Pause DApp') {
        res = await batchPauseApp({ appIds: appIds });
      }
    }

    if (updateType === 'single' && appId && version) {
      if (actionType === 'Destroy Services') {
        res = await destroyApp({ appId, version });
      } else if (actionType === 'Restart DApp') {
        res = await restartApp({ appId, version });
      } else if (actionType === 'Stop DApp') {
        res = await stopApp({ appId, version });
      } else if (actionType === 'Pause DApp') {
        res = await pauseApp({ appId, version });
      }
    }

    if (res) {
      message?.success(`${actionType} successfully`);
      setNeedRefresh(!needRefresh);
    }
    setLoading(false);
    setIsShowConfirmModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsShowConfirmModal, updateType, appId, version, appIds, actionType]);

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
            loading={loading}
            className={clsx(
              'w-[180px]',
              actionType === 'Stop DApp' &&
                'bg-danger-normal border-danger-normal text-white-normal border border-solid'
            )}
            onClick={() => handleAction()}
          >
            {actionType}
          </Button>
        </div>
      }
    >
      {actionType === 'Pause DApp' && (
        <div className='text-center'>
          <PauseCircleOutlined className='text-danger-normal m-auto my-[10px] text-[70px]' />
          <div className='text-gray-80 text-left text-[16px]'>
            Are you sure you want to pause this DApp? It needs to be restarted
            to be used.
          </div>
        </div>
      )}
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
