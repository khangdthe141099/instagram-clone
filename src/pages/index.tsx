import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import Layout from '@/components/Layout/Public';
import HomeMain from '@/components/Pages/Home/HomeMain';
import HomeSider from '@/components/Pages/Home/HomeSider';

const Home: NextPageWithLayout = () => (
  <div className='homepage'>
    <HomeMain />
    <HomeSider />
  </div>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
