'use client';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(
  async () => {
    const ReactJson = await import('react-json-view').then((module) => module);
    return ReactJson;
  },
  { ssr: false }
);

type ManifestProps = {
  readonly manifestJson?: object;
};
export default function Manifest({ manifestJson = {} }: ManifestProps) {
  return (
    <div className='mb-[24px] w-full overflow-auto'>
      <ReactJson src={manifestJson}></ReactJson>
    </div>
  );
}
