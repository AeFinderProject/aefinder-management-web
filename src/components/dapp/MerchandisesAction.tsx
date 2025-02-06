import {
  Button,
  Divider,
  Drawer,
  Input,
  InputNumber,
  message,
  Select,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { useDebounceCallback } from '@/lib/utils';

import { createMerchandise, modifyMerchandise } from '@/api/requestApp';

import {
  ChargeTypeEnum,
  MerchandiseCategoryEnum,
  MerchandisesItemType,
  MerchandiseStatusEnum,
  MerchandiseTypeEnum,
} from '@/types/appType';

const Option = Select.Option;

type MerchandisesActionProps = {
  readonly currentMerchandisesItem?: MerchandisesItemType | null;
  readonly isShowActionDrawer: boolean;
  readonly setIsShowActionDrawer: (params: boolean) => void;
  readonly currentAction: string;
};

export default function MerchandisesAction({
  currentMerchandisesItem,
  isShowActionDrawer,
  setIsShowActionDrawer,
  currentAction,
}: MerchandisesActionProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState<string>(currentMerchandisesItem?.name ?? '');
  const [description, setDescription] = useState<string>(
    currentMerchandisesItem?.description ?? ''
  );
  const [unit, setUnit] = useState<string>(currentMerchandisesItem?.unit ?? '');
  const [price, setPrice] = useState<number>(
    currentMerchandisesItem?.price ?? 0
  );
  const [specification, setSpecification] = useState<string>(
    currentMerchandisesItem?.specification ?? ''
  );
  const [chargeType, setChargeType] = useState<number>(
    currentMerchandisesItem?.chargeType ?? 0
  );
  const [type, setType] = useState<MerchandiseTypeEnum>(
    currentMerchandisesItem?.type ?? MerchandiseTypeEnum?.ApiQuery
  );
  const [category, setCategory] = useState<MerchandiseCategoryEnum>(
    currentMerchandisesItem?.category ?? MerchandiseCategoryEnum?.ApiQuery
  );
  const [status, setStatus] = useState<MerchandiseStatusEnum>(
    currentMerchandisesItem?.status ?? 0
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentMerchandisesItem) {
      setName(currentMerchandisesItem?.name);
      setDescription(currentMerchandisesItem?.description);
      setUnit(currentMerchandisesItem?.unit);
      setPrice(currentMerchandisesItem?.price);
      setSpecification(currentMerchandisesItem?.specification ?? '');
      setChargeType(currentMerchandisesItem?.chargeType);
      setType(currentMerchandisesItem?.type);
      setCategory(currentMerchandisesItem?.category);
      setStatus(currentMerchandisesItem?.status);
    }
  }, [currentMerchandisesItem]);

  const handleCancel = useCallback(() => {
    setIsShowActionDrawer(false);
    setName('');
    setDescription('');
    setUnit('');
    setPrice(0);
    setSpecification('');
    setChargeType(0);
    setType(MerchandiseTypeEnum.ApiQuery);
    setCategory(MerchandiseCategoryEnum.ApiQuery);
    setStatus(0);
  }, [setIsShowActionDrawer]);

  const handleAction = useDebounceCallback(async () => {
    if (!name) {
      messageApi.warning('please enter name');
      return;
    }
    if (price === 0) {
      messageApi.warning('please enter price greater than 0');
      return;
    }

    try {
      setLoading(true);
      const params = {
        name,
        description,
        unit,
        price,
        specification,
        chargeType,
        type,
        category,
        status,
      };
      let res;
      if (currentAction === 'Create') {
        res = await createMerchandise(params);
      } else {
        res = await modifyMerchandise({
          id: currentMerchandisesItem?.id,
          ...params,
        });
      }
      if (res?.id) {
        messageApi.success({
          content: `${currentAction} merchandise success`,
          key: 'Set',
        });
        setTimeout(() => {
          handleCancel();
          setIsShowActionDrawer(false);
        }, 1000);
      }
    } finally {
      setLoading(false);
    }
  }, [
    name,
    description,
    unit,
    price,
    specification,
    category,
    chargeType,
    type,
    status,
    currentAction,
    currentMerchandisesItem,
    handleCancel,
    setIsShowActionDrawer,
  ]);

  return (
    <Drawer
      title={`${currentAction} Merchandise`}
      open={isShowActionDrawer}
      onClose={() => handleCancel()}
      destroyOnClose={true}
    >
      {contextHolder}
      <div>
        <div className='text-dark-normal mb-[8px] text-[16px]'>Name</div>
        <Input
          placeholder='Enter merchandises name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border-gray-E0 w-full rounded-[8px]'
        />
        <div className='text-dark-normal mb-[8px] mt-[16px] text-[16px]'>
          Description
        </div>
        <Input
          placeholder='Enter merchandises description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border-gray-E0 w-full rounded-[8px]'
        />
        <div className='text-dark-normal mb-[8px] mt-[16px] text-[16px]'>
          Unit
        </div>
        <Input
          placeholder='Enter merchandises unit'
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className='border-gray-E0 w-full rounded-[8px]'
        />
        <div className='text-dark-normal mb-[8px] mt-[16px] text-[16px]'>
          Price
        </div>
        <InputNumber
          placeholder='Enter merchandises price'
          value={price}
          onChange={(value) => setPrice(value || 0)}
          className='border-gray-E0 w-full rounded-[8px]'
          changeOnBlur
        />
        <div className='text-dark-normal mb-[8px] mt-[16px] text-[16px]'>
          Specification
        </div>
        <Input
          placeholder='Enter Max AeIndexer Count'
          value={specification}
          onChange={(e) => setSpecification(e.target.value)}
          className='border-gray-E0 w-full rounded-[8px]'
        />
        <div className='text-dark-normal mb-[8px] mt-[20px] text-[16px]'>
          ChargeType
        </div>
        <Select
          value={chargeType}
          onChange={(value) => {
            setChargeType(value);
          }}
          className='w-full rounded-[8px]'
          size='large'
        >
          <Option value={0}>{ChargeTypeEnum[0]}</Option>
          <Option value={1}>{ChargeTypeEnum[1]}</Option>
        </Select>
        <div className='text-dark-normal mb-[8px] mt-[20px] text-[16px]'>
          Type
        </div>
        <Select
          value={type}
          onChange={(value) => {
            setType(value);
          }}
          className='w-full rounded-[8px]'
          size='large'
        >
          <Option value={0}>{MerchandiseTypeEnum[0]}</Option>
          <Option value={1}>{MerchandiseTypeEnum[1]}</Option>
          <Option value={2}>{MerchandiseTypeEnum[2]}</Option>
        </Select>
        <div className='text-dark-normal mb-[8px] mt-[20px] text-[16px]'>
          Category
        </div>
        <Select
          value={category}
          onChange={(value) => {
            setCategory(value);
          }}
          className='w-full rounded-[8px]'
          size='large'
        >
          <Option value={0}>{MerchandiseCategoryEnum[0]}</Option>
          <Option value={1}>{MerchandiseCategoryEnum[1]}</Option>
        </Select>
        <div className='text-dark-normal mb-[8px] mt-[20px] text-[16px]'>
          Status
        </div>
        <Select
          value={status}
          onChange={(value) => {
            setStatus(value);
          }}
          className='w-full rounded-[8px]'
          size='large'
        >
          <Option value={0}>{MerchandiseStatusEnum[0]}</Option>
          <Option value={1}>{MerchandiseStatusEnum[1]}</Option>
        </Select>
        <Divider />
        <div className='flex w-full justify-between'>
          <Button
            type='default'
            size='large'
            className='text-blue-link border-blue-link bg-white-normal w-[160px] border border-solid'
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            size='large'
            className='w-[160px]'
            loading={loading}
            onClick={() => handleAction()}
          >
            {currentAction}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
