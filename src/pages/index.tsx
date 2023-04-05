import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import Layout from '@/components/Layout/Public';
import HomeMain from '@/components/Pages/Home/HomeMain';
import HomeSider from '@/components/Pages/Home/HomeSider';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const Home: NextPageWithLayout = () => {
  return (
    <div className='homepage'>
    <HomeMain />
    <HomeSider />
  </div>
  )
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps  = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
