import { Divider, Drawer } from 'antd';

import Copy from '@/components/Copy';

import { ContainersType } from '@/types/appType';

type PodContainerDrawerProps = {
  isShowContainerDrawer: boolean;
  setIsShowContainerDrawer: (isShowContainerDrawer: boolean) => void;
  tempContainer: ContainersType[];
  setTempContainer: (tempContainer: ContainersType[]) => void;
};

export default function PodContainerDrawer({
  isShowContainerDrawer,
  setIsShowContainerDrawer,
  tempContainer,
  setTempContainer,
}: PodContainerDrawerProps) {
  return (
    <Drawer
      title='Containers Detail'
      open={isShowContainerDrawer}
      onClose={() => {
        setTempContainer([]);
        setIsShowContainerDrawer(false);
      }}
      destroyOnClose={true}
    >
      {tempContainer?.map((item, index) => (
        <div key={item.containerID} className='break-all'>
          {index !== 0 && <Divider />}
          <Copy
            label='ContainerID'
            content={item.containerID}
            isShowCopy={true}
            className='mb-2 w-full'
          />
          <Copy
            label='ContainerName'
            content={item.containerName}
            isShowCopy={true}
            className='mb-2 w-full'
          />
          <Copy
            label='ContainerImage'
            content={item.containerImage}
            isShowCopy={true}
            className='mb-2 w-full'
          />
          <Copy
            label='RestartCount'
            content={item.restartCount}
            className='mb-2 w-full'
          />
          <Copy
            label='Ready'
            content={String(item.ready)}
            className='mb-2 w-full'
          />
          <Copy
            label='Status'
            content={item.currentState}
            className='mb-2 w-full'
          />
        </div>
      ))}
      {tempContainer?.length === 0 && (
        <div className='text-dark-normal'> --- No container data --- </div>
      )}
    </Drawer>
  );
}
