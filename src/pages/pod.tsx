import { SearchOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Input, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { formatDuration, useDebounceCallback } from '@/lib/utils';

import PodContainerDrawer from '@/components/dapp/PodContainerDrawer';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPodInfosList } from '@/store/slices/appSlice';

import { queryAuthToken } from '@/api/apiUtils';
import { getDeployPodsList } from '@/api/requestApp';

import { ContainersType, PodInfosType } from '@/types/appType';

export default function Pod() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState('');
  const [tempContinueToken, setTempContinueToken] = useState<string>('');
  const podInfosList = useAppSelector((state) => state.app.podInfosList);
  const [isShowContainerDrawer, setIsShowContainerDrawer] = useState(false);
  const [tempContainer, setTempContainer] = useState<ContainersType[]>([]);
  const isMobile = window?.innerWidth < 640;

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const columns: TableColumnsType<PodInfosType> = [
    { title: 'AppId', dataIndex: 'appId', key: 'appId' },
    { title: 'AeIndexerVersion', dataIndex: 'appVersion', key: 'appVersion' },
    { title: 'PodName', dataIndex: 'podName', key: 'podName' },
    {
      title: 'StartTime',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime) => (
        <div className='text-black-normal whitespace-nowrap'>
          {dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      ),
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Ready',
      dataIndex: 'readyContainersCount',
      key: 'readyContainersCount',
      render: (readyContainersCount, record) => {
        return (
          <div className='text-black-normal whitespace-nowrap'>
            {readyContainersCount}/{record.totalContainersCount}
          </div>
        );
      },
    },
    {
      title: 'Age',
      dataIndex: 'ageSeconds',
      key: 'ageSeconds',
      render: (ageSeconds) => {
        return (
          <div className='text-black-normal whitespace-nowrap'>
            {formatDuration(ageSeconds)}
          </div>
        );
      },
    },
    {
      title: 'Containers',
      dataIndex: 'containers',
      key: 'containers',
      render: (containers) => {
        return (
          <div
            className='text-blue-normal cursor-pointer'
            onClick={() => {
              setTempContainer(containers);
              setIsShowContainerDrawer(true);
            }}
          >
            Detail
          </div>
        );
      },
    },
  ];

  const handleAppIdChange = (value: string) => {
    if (appId === '' && value === '') {
      return;
    }
    setTempContinueToken('');
    dispatch(setPodInfosList([]));
    setAppId(value);
  };

  const getDeployPodsListTemp = useDebounceCallback(async () => {
    await queryAuthToken();
    try {
      setLoading(true);
      const { podInfos = [], continueToken } = await getDeployPodsList({
        appId,
        pageSize: 10,
        continueToken: tempContinueToken,
      });
      // add pods and remove duplicates
      const temp = [...podInfosList, ...podInfos];
      const uniqueData = temp.reduce((acc: PodInfosType[], current) => {
        if (!acc.find((item) => item.podUid === current.podUid)) {
          acc.push(current);
        }
        return acc;
      }, []);
      dispatch(setPodInfosList(uniqueData));
      setTempContinueToken(continueToken);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, appId]);

  useEffect(() => {
    getDeployPodsListTemp();
  }, [getDeployPodsListTemp, appId]);

  useEffect(() => {
    if (inView && tempContinueToken) {
      getDeployPodsListTemp();
    }
  }, [getDeployPodsListTemp, inView, tempContinueToken]);

  return (
    <div className='w-full overflow-auto px-[16px] pb-[28px] pt-[48px]'>
      <div className='mb-[16px]'>
        <Input
          placeholder='Search by AppId'
          defaultValue={appId}
          onBlur={(e) => handleAppIdChange(e?.target?.value || '')}
          style={{
            width: 180,
            height: 32,
            borderColor: '#E0E0E0',
            borderRadius: '8px',
            marginRight: '8px',
          }}
          prefix={<SearchOutlined className='text-[#E0E0E0]' />}
        />
      </div>
      <Table
        rowKey={(record) => record.podUid}
        columns={columns}
        dataSource={podInfosList}
        loading={loading}
        className='w-full'
        size={isMobile ? 'small' : 'middle'}
        pagination={false}
      />
      <div ref={ref} className='mt-[16px] text-center'>
        {inView && tempContinueToken === null
          ? '--- All pod have loaded ---'
          : 'Loading more...'}
      </div>
      <PodContainerDrawer
        isShowContainerDrawer={isShowContainerDrawer}
        tempContainer={tempContainer}
        setTempContainer={setTempContainer}
        setIsShowContainerDrawer={setIsShowContainerDrawer}
      />
    </div>
  );
}
