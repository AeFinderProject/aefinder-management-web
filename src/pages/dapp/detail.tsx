import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DetailBox from '@/components/dapp/DetailBox';
import SubscriptionsVersion from '@/components/dapp/SubscriptionsVersion';

import { GetAppResponseItem, VersionType } from '@/types/appType';

export default function Detail() {
  const router = useRouter();
  const [currentAppDetail, setCurrentAppDetail] = useState<GetAppResponseItem>(
    {} as GetAppResponseItem
  );
  const [currentVersionDetail, setCurrentVersionDetail] = useState(
    {} as VersionType
  );
  const [pendingVersionDetail, setPendingVersionDetail] = useState(
    {} as VersionType
  );

  useEffect(() => {
    const appId = localStorage.getItem('appId');
    console.log(appId);
  }, []);

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
      />
      <SubscriptionsVersion
        title='Pending Version'
        VersionDetail={pendingVersionDetail}
        updateTime={currentAppDetail?.updateTime}
        createTime={currentAppDetail?.createTime}
      />
    </div>
  );
}
