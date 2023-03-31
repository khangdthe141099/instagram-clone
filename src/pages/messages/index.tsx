import type { NextPageWithLayout } from '@/pages/_app';
import type { ReactElement } from 'react';
import Layout from '@/components/Layout/Public';

const Messages: NextPageWithLayout = () => (
  <div className='messages-page'>
    Messages
  </div>
);

Messages.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Messages;
