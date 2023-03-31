import type { NextPageWithLayout } from '@/pages/_app';
import type { ReactElement } from 'react';
import Layout from '@/components/Layout/Public';

const Reels: NextPageWithLayout = () => (
  <div className='reels-page'>
    Reels
  </div>
);

Reels.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Reels;
