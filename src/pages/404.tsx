import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white-normal'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <ArrowLink className='mt-4 md:text-lg' href='/login'>
              Back to login
            </ArrowLink>
          </div>
        </section>
      </main>
    </>
  );
}
