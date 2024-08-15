import { Button, Divider, Drawer, Input } from 'antd';
import { useCallback, useState } from 'react';

type DeployDrawerProps = {
  isShowDeployDrawer: boolean;
  setIsShowDeployDrawer: (params: boolean) => void;
};

export default function DeployDrawer({
  isShowDeployDrawer,
  setIsShowDeployDrawer,
}: DeployDrawerProps) {
  const [dockerImage, setDockerImage] = useState('');

  const handleCancel = useCallback(() => {
    setIsShowDeployDrawer(false);
  }, [setIsShowDeployDrawer]);

  return (
    <Drawer
      title='Deploy'
      open={isShowDeployDrawer}
      onClose={() => handleCancel()}
    >
      <div>
        <div className='text-dark-normal mb-[8px] text-[16px]'>
          Docker Image
        </div>
        <Input
          placeholder='Enter Docker image'
          value={dockerImage}
          onChange={(e) => setDockerImage(e.target.value)}
          className='border-gray-E0 w-full rounded-[8px]'
        />
        <Divider />
        <div className='flex w-full justify-between'>
          <Button
            type='default'
            size='large'
            className='text-blue-link border-blue-link w-[160px] border border-solid bg-white'
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            size='large'
            className='w-[160px]'
            onClick={() => {
              console.log('Deploy');
            }}
          >
            Deploy
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
