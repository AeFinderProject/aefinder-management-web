import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Menu from '@/components/layout/Menu';
export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-[100vh] flex-col justify-between'>
      <Header />
      <main className='flex flex-1 items-stretch justify-start'>
        <Menu />
        <div className='flex-1 overflow-x-auto'>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
