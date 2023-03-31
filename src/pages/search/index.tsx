import type { NextPageWithLayout } from '@/pages/_app';
import type { ReactElement } from 'react';
import Layout from '@/components/Layout/Public';

const Search: NextPageWithLayout = () => (
  <div className='search-page'>
    Search
  </div>
);

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Search;
