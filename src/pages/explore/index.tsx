import type { NextPageWithLayout } from '@/pages/_app';
import type { ReactElement } from 'react';
import Layout from '@/components/Layout/Public';

const Explore: NextPageWithLayout = () => (
  <div className='explore-page'>
    Explore
  </div>
);

Explore.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Explore;
