import {
  AppstoreOutlined,
  DashboardOutlined,
  PartitionOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: 'dapp', icon: <AppstoreOutlined />, label: 'DApp' },
  { key: 'limit', icon: <DashboardOutlined />, label: 'Limit' },
  { key: 'organization', icon: <PartitionOutlined />, label: 'Organization' },
];

export default function MyMenu() {
  const [currentRoute, setCurrentRoute] = useState('dapp');
  const router = useRouter();
  const { pathname } = router;

  const handleRouterChange = useCallback(
    (key: string) => {
      router.push(`/${key}`);
    },
    [router]
  );

  useEffect(() => {
    setCurrentRoute(pathname.split('/')[1]);
  }, [pathname]);

  return (
    <Menu
      className={clsx(
        pathname !== '/login' && pathname !== '/'
          ? 'm-w-[170px] hidden w-[170px] border-none pt-[48px] font-medium sm:block'
          : 'hidden'
      )}
      selectedKeys={[currentRoute]}
      mode='inline'
      theme='light'
      onClick={({ key }) => handleRouterChange(key)}
      items={items}
    />
  );
}
