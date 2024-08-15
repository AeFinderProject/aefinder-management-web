import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import Copy from '@/components/Copy';
import Manifest from '@/components/dapp/Manifest';

import { SubscriptionStatusType, VersionType } from '@/types/appType';

type SubscriptionsVersionProps = {
  readonly title: string;
  readonly VersionDetail: VersionType;
  readonly updateTime: string;
  readonly createTime: string;
};

export default function SubscriptionsVersion({
  title,
  VersionDetail,
  updateTime,
  createTime,
}: SubscriptionsVersionProps) {
  const [dockerImage, setDockerImage] = useState('');
  const [isShowManifest, setIsShowManifest] = useState(false);

  useEffect(() => {
    // todo appId -> request resource dockerImage

    setDockerImage(dockerImage);
  }, [VersionDetail?.appId, setDockerImage]);

  return (
    <div className='bg-gray-F5 mt-[30px] w-full rounded-md px-[24px] pt-[24px]'>
      <div className='text-dark-normal mb-[30px] text-xl font-medium'>
        {title}
      </div>
      <Row gutter={24} className='mb-[16px] w-full'>
        <Col sm={24} md={8} className='min-w-[140px]'>
          <Copy
            label='Version: '
            content={VersionDetail?.version}
            className='flex items-center justify-start text-base'
            vertical={false}
          />
        </Col>
        <Col sm={24} md={8} className='min-w-[140px]'>
          <Copy
            label='Create Time: '
            content={dayjs(createTime).format('YYYY-MM-DD')}
            className='flex items-center justify-start'
            vertical={false}
          />
        </Col>
        <Col sm={24} md={8} className='min-w-[140px]'>
          <Copy
            label='Subscription Status: '
            content={SubscriptionStatusType[VersionDetail?.subscriptionStatus]}
            className='flex items-center justify-start'
            vertical={false}
          />
        </Col>
      </Row>
      <Row gutter={24} className='w-full'>
        <Col sm={24} md={8} className='min-w-[140px]'>
          <Copy
            label='Docker Image: '
            content={dockerImage}
            className='flex items-center justify-start'
            vertical={false}
          />
        </Col>
        <Col sm={24} md={8} className='min-w-[140px]'>
          <Copy
            label='Update Time: '
            content={dayjs(updateTime).format('YYYY-MM-DD')}
            className='flex items-center justify-start'
            vertical={false}
          />
        </Col>
      </Row>
      <Row gutter={24} className='w-full'>
        <Col sm={24} md={24} className='w-full min-w-[140px]'>
          <Divider className='mb-0' />
        </Col>
      </Row>
      <Row gutter={24} className='w-full'>
        <Col sm={24} md={24} className='w-full min-w-[140px]'>
          <div
            onClick={() => setIsShowManifest(!isShowManifest)}
            className='flex w-full cursor-pointer items-center justify-between py-[16px]'
          >
            <span>Subscription Manifest</span>
            {isShowManifest ? <UpOutlined /> : <DownOutlined />}
          </div>
          {isShowManifest && (
            <Manifest manifestJson={VersionDetail?.subscriptionManifest} />
          )}
        </Col>
      </Row>
    </div>
  );
}
