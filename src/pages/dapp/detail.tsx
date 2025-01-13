import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useDebounceCallback } from '@/lib/utils';

import DetailBox from '@/components/dapp/DetailBox';
import SubscriptionsVersion from '@/components/dapp/SubscriptionsVersion';

import { getAppDetail, getManifest, getResources } from '@/api/requestApp';

import { GetAppResponseItem, VersionType } from '@/types/appType';

export default function AppDetail() {
  const router = useRouter();
  const [currentAppDetail, setCurrentAppDetail] =
    useState<GetAppResponseItem>();
  const [currentVersionDetail, setCurrentVersionDetail] =
    useState<VersionType>();
  const [pendingVersionDetail, setPendingVersionDetail] =
    useState<VersionType>();
  const [currentDockerImage, setCurrentDockerImage] = useState('');
  const [pendingDockerImage, setPendingDockerImage] = useState('');
  const [needRefresh, setNeedRefresh] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const [appId, setAppId] = useState(searchParams.get('appId'));

  const tempGetManifest = useDebounceCallback(async () => {
    console.log(appId);
    if (!appId) {
      return;
    }

    const resDetail = await getAppDetail({ appId });
    setCurrentAppDetail(resDetail);
    console.log(resDetail);
    const res = await getManifest({ appId });
    if (res[0]?.version === resDetail?.versions?.currentVersion) {
      setCurrentVersionDetail(res[0]);
    }
    if (res[0]?.version === resDetail?.versions?.pendingVersion) {
      setPendingVersionDetail(res[0]);
    }
    if (res[1]?.version === resDetail?.versions?.currentVersion) {
      setCurrentVersionDetail(res[1]);
    }
    if (res[1]?.version === resDetail?.versions?.pendingVersion) {
      setPendingVersionDetail(res[1]);
    }

    const resResources = await getResources({ appId });
    if (resResources[0]?.version === resDetail?.versions?.currentVersion) {
      setCurrentDockerImage(resResources[0].dockerImage);
    }
    if (resResources[1]?.version === resDetail?.versions?.currentVersion) {
      setCurrentDockerImage(resResources[1].dockerImage);
    }
    if (resResources[0]?.version === resDetail?.versions?.pendingVersion) {
      setPendingDockerImage(resResources[0].dockerImage);
    }
    if (resResources[1]?.version === resDetail?.versions?.pendingVersion) {
      setPendingDockerImage(resResources[1].dockerImage);
    }
  }, [appId]);

  useEffect(() => {
    tempGetManifest();
  }, [tempGetManifest, appId, needRefresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!appId) {
        const searchParams = new URLSearchParams(window.location.search);
        setAppId(searchParams?.get('appId'));
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [appId]);

  return (
    <div className='px-[16px] pb-[28px] pt-[26px]'>
      <div>
        <span className='text-gray-80 mt-[26px] text-[14px]'>
          <span onClick={() => router.back()} className='cursor-pointer'>
            AeIndexer
          </span>
          <RightOutlined />
        </span>
        <span className='text-dark-normal font-medium'> AeIndexer Detail</span>
      </div>
      <DetailBox currentAppDetail={currentAppDetail} />
      {currentAppDetail?.versions?.currentVersion && (
        <SubscriptionsVersion
          title='Current Version'
          VersionDetail={currentVersionDetail}
          dockerImage={currentDockerImage}
          needRefresh={needRefresh}
          setNeedRefresh={setNeedRefresh}
        />
      )}
      {currentAppDetail?.versions?.pendingVersion && (
        <SubscriptionsVersion
          title='Pending Version'
          VersionDetail={pendingVersionDetail}
          dockerImage={pendingDockerImage}
          needRefresh={needRefresh}
          setNeedRefresh={setNeedRefresh}
        />
      )}
      {!currentAppDetail?.versions?.currentVersion &&
        !currentAppDetail?.versions?.pendingVersion && (
          <div className='text-gray-80 mt-[26px] text-center text-[14px]'>
            No version
          </div>
        )}
    </div>
  );
}
