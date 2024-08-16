// import { useState } from 'react';
import { AppstoreOutlined, DashboardOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: 'dapp', icon: <AppstoreOutlined />, label: 'DApp' },
  { key: 'limit', icon: <DashboardOutlined />, label: 'Limit' },
];

export default function MyMenu() {
  const router = useRouter();
  const { pathname } = router;
  const handleRouterChange = (key: string) => {
    router.push(`/${key}`);
  };

  return (
    <Menu
      className={clsx(
        pathname !== '/login' && pathname !== '/'
          ? 'm-w-[150px] hidden w-[150px] border-none pt-[48px] font-medium sm:block'
          : 'hidden'
      )}
      defaultSelectedKeys={[`${pathname.replace(/^\/+/, '')}`]}
      mode='inline'
      theme='light'
      onClick={({ key }) => handleRouterChange(key)}
      items={items}
    />
  );
}
