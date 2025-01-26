import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Button, Select, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import MerchandisesAction from '@/components/dapp/MerchandisesAction';

import { queryAuthToken } from '@/api/apiUtils';
import { getMerchandisesList } from '@/api/requestApp';

import {
  ChargeTypeEnum,
  MerchandiseCategoryEnum,
  MerchandisesItemType,
  MerchandiseStatusEnum,
  MerchandiseTypeEnum,
} from '@/types/appType';

const Option = Select.Option;

export default function Merchandises() {
  const [merchandisesList, setMerchandisesList] = useState<
    MerchandisesItemType[]
  >([]);
  const [currentMerchandisesItem, setCurrentMerchandisesItem] =
    useState<MerchandisesItemType | null>(null);
  const [currentAction, setCurrentAction] = useState<string>('Update');
  const [isShowActionDrawer, setIsShowActionDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<null | number>(null);
  const [category, setCategory] = useState<null | number>(null);

  const getMerchandisesListTemp = useCallback(async () => {
    await queryAuthToken();
    try {
      setLoading(true);
      const { items = [] } = await getMerchandisesList({
        type,
        category,
      });
      setMerchandisesList(items);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, category, isShowActionDrawer]);

  useEffect(() => {
    getMerchandisesListTemp();
  }, [getMerchandisesListTemp]);

  const columns: TableColumnsType<MerchandisesItemType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Specification',
      dataIndex: 'specification',
      key: 'specification',
    },
    {
      title: 'ChargeType',
      dataIndex: 'chargeType',
      key: 'chargeType',
      render: (text) => <div>{ChargeTypeEnum[text]}</div>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <div>{MerchandiseTypeEnum[text]}</div>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <div>{MerchandiseCategoryEnum[text]}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <div>{MerchandiseStatusEnum[text]}</div>,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <div className='relative z-10'>
          <EditOutlined
            className='text-blue-link ml-[20px] mr-[8px] cursor-pointer text-[16px]'
            onClick={() => {
              setCurrentMerchandisesItem(record);
              setCurrentAction('Update');
              setIsShowActionDrawer(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleCreate = useCallback(() => {
    setCurrentMerchandisesItem(null);
    setCurrentAction('Create');
    setIsShowActionDrawer(true);
  }, []);

  return (
    <div className='px-[16px] pb-[28px] pt-[48px]'>
      <div className='mb-[16px] flex items-center justify-between'>
        <div>
          <span className='text-dark-normal mr-[6px]'>Type:</span>
          <Select
            defaultValue={null}
            style={{ width: 120 }}
            onChange={(value) => {
              setType(value);
            }}
            className='mr-[16px]'
          >
            <Option value={null}>All</Option>
            <Option value={0}>ApiQuery</Option>
            <Option value={1}>Processor</Option>
            <Option value={2}>Storage</Option>
          </Select>
          <span className='text-dark-normal ml-[12px] mr-[6px]'>Category:</span>
          <Select
            defaultValue={null}
            style={{ width: 180 }}
            onChange={(value) => {
              setCategory(value);
            }}
          >
            <Option value={null}>All</Option>
            <Option value={0}>ApiQuery</Option>
            <Option value={1}>ProcessorOrStorage</Option>
          </Select>
        </div>
        <div>
          <Button icon={<PlusOutlined />} onClick={handleCreate}>
            Create
          </Button>
        </div>
      </div>
      <Table
        rowKey={(record) => record?.id || record?.name}
        columns={columns}
        dataSource={merchandisesList}
        loading={loading}
        scroll={{ x: 'max-content' }}
        className='w-full'
      />
      <MerchandisesAction
        isShowActionDrawer={isShowActionDrawer}
        setIsShowActionDrawer={setIsShowActionDrawer}
        currentMerchandisesItem={currentMerchandisesItem}
        currentAction={currentAction}
      />
    </div>
  );
}
