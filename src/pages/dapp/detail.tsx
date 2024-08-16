import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import DetailBox from '@/components/dapp/DetailBox';
import SubscriptionsVersion from '@/components/dapp/SubscriptionsVersion';

import { getResources } from '@/api/requestApp';
import { getAppDetail, getManifest } from '@/api/requestApp';

import { GetAppResponseItem, VersionType } from '@/types/appType';

export default function Detail() {
  const router = useRouter();
  const [currentAppDetail, setCurrentAppDetail] =
    useState<GetAppResponseItem>();
  const [currentVersionDetail, setCurrentVersionDetail] =
    useState<VersionType>();
  const [pendingVersionDetail, setPendingVersionDetail] =
    useState<VersionType>();
  const [currentDockerImage, setCurrentDockerImage] = useState('');
  const [pendingDockerImage, setPendingDockerImage] = useState('');

  const appId = localStorage.getItem('appId');

  const tempGetAppDetail = useCallback(async () => {
    if (!appId) {
      return;
    }
    const res = await getAppDetail({ appId });
    setCurrentAppDetail(res);
  }, [appId]);

  const tempGetManifest = useCallback(async () => {
    if (!appId) {
      return;
    }
    const res = await getManifest({ appId });
    res[0] && setCurrentVersionDetail(res[0]);
    res[1] && setPendingVersionDetail(res[1]);
  }, [appId]);

  const tempGetResources = useCallback(async () => {
    if (!appId) {
      return;
    }
    const res = await getResources({ appId });
    res[0] && setCurrentDockerImage(res[0].dockerImage);
    res[1] && setPendingDockerImage(res[1].dockerImage);
  }, [appId]);

  useEffect(() => {
    tempGetAppDetail();
    tempGetManifest();
    tempGetResources();
  }, [appId, tempGetAppDetail, tempGetManifest, tempGetResources]);

  return (
    <div className='px-[16px] pb-[28px] pt-[26px]'>
      <div>
        <span className='text-gray-80 mt-[26px] text-[14px]'>
          <span onClick={() => router.back()} className='cursor-pointer'>
            DApp
          </span>
          <RightOutlined />
        </span>
        <span className='text-dark-normal font-medium'> App Detail</span>
      </div>
      <DetailBox currentAppDetail={currentAppDetail} />
      <SubscriptionsVersion
        title='Current Version'
        VersionDetail={currentVersionDetail}
        updateTime={currentAppDetail?.updateTime}
        createTime={currentAppDetail?.createTime}
        dockerImage={currentDockerImage}
      />
      {currentAppDetail?.versions?.pendingVersion && (
        <SubscriptionsVersion
          title='Pending Version'
          VersionDetail={pendingVersionDetail}
          updateTime={currentAppDetail?.updateTime}
          createTime={currentAppDetail?.createTime}
          dockerImage={pendingDockerImage}
        />
      )}
    </div>
  );
}
