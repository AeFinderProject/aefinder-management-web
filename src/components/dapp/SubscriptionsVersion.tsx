import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import Copy from '@/components/Copy';
import ActionMenuItem from '@/components/dapp/ActionMenuItem';
import Manifest from '@/components/dapp/Manifest';

import { SubscriptionStatusType, VersionType } from '@/types/appType';

type SubscriptionsVersionProps = {
  readonly title: string;
  readonly VersionDetail?: VersionType;
  readonly updateTime?: string;
  readonly createTime?: string;
  readonly dockerImage?: string;
};

export default function SubscriptionsVersion({
  title,
  VersionDetail,
  updateTime,
  createTime,
  dockerImage,
}: SubscriptionsVersionProps) {
  const [isShowManifest, setIsShowManifest] = useState(false);

  return (
    <div className='bg-gray-F5 mt-[30px] w-full rounded-md px-[24px] pt-[24px]'>
      <div className='text-dark-normal mb-[30px] flex items-center justify-between'>
        <span className='text-xl font-medium'>{title}</span>
        <ActionMenuItem
          appId={VersionDetail?.appId}
          version={VersionDetail?.version}
        />
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
            content={
              SubscriptionStatusType[VersionDetail?.subscriptionStatus ?? 0]
            }
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
