'use client';

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import PrimaryLink from '@/components/links/PrimaryLink';

import { useAppSelector } from '@/store/hooks';

export default function Header() {
  const router = useRouter();
  const [isShowBox, setIsShowBox] = useState(false);
  const { pathname } = router;
  const username = useAppSelector((state) => state.common.username);

  useEffect(() => {
    const logoutContainer = document?.getElementById('logout-container');
    const listen = function (event: Event) {
      const node = event?.target;
      if (node instanceof Node && !logoutContainer?.contains(node)) {
        setIsShowBox(false);
      }
    };
    document?.addEventListener('click', listen);
    return () => {
      document?.removeEventListener('click', listen);
    };
  }, []);

  const handleLogout = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <header className='border-gray-E0 flex h-[72px] w-full items-center justify-between border-b px-[16px] py-[24px] sm:px-[40px]'>
      <div className='flex'>
        <Image
          src='/assets/svg/aefinder-logo.svg'
          alt='logo'
          width={150}
          height={24}
          className='cursor-pointer'
          style={{ width: '150px', height: '24px' }}
        />
        {pathname === '/login' && (
          <span className='text-dark-normal ml-[8px] inline-block text-2xl font-medium sm:hidden'>
            Management
          </span>
        )}
        <span className='text-dark-normal ml-[8px] hidden text-2xl font-medium sm:inline-block'>
          Management
        </span>
      </div>
      {pathname !== '/login' && pathname !== '/' && (
        <div>
          <div
            className='border-gray-E0 m-w-[150px] relative inline-block min-h-10 cursor-pointer rounded border pl-[20px] pr-[30px] text-center leading-[40px]'
            onClick={() => {
              setTimeout(() => {
                setIsShowBox(!isShowBox);
              }, 100);
            }}
          >
            <Image
              src='/assets/svg/user.svg'
              alt='user'
              width={18}
              height={18}
              className='mr-2 inline-block'
            />
            {username}
            {isShowBox ? (
              <UpOutlined className='text-gray-80 absolute right-[6px] top-[13px]' />
            ) : (
              <DownOutlined className='text-gray-80 absolute right-[6px] top-[13px]' />
            )}
            <div
              id='logout-container'
              className={clsx(
                'h-13 border-gray-F0 bg-white-normal fixed left-0 top-[71px] z-10 w-full border-b border-t bg-opacity-100 p-1 sm:absolute sm:top-[52px] sm:min-w-[144px] sm:rounded sm:border',
                !isShowBox && 'hidden'
              )}
            >
              <UpOutlined className='border-b-none text-gray-E0 bg-white-normal absolute hidden text-xs sm:right-[58px] sm:top-[-12px] sm:block' />
              <PrimaryLink
                href='/dapp'
                className='hover:bg-gray-F5 w-full border-none px-[16px] sm:hidden'
              >
                Dapp
              </PrimaryLink>
              <div className='hover:bg-gray-F5 border-gray-F0 w-full border-b border-t px-[16px] text-left sm:hidden'>
                <PrimaryLink href='/limit' className='test-left block w-full'>
                  Limit
                </PrimaryLink>
              </div>
              <div
                className='hover:bg-gray-F5 border-none px-[16px] text-left sm:text-center'
                onClick={() => handleLogout()}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
