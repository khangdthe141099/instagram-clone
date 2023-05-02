import type { NextPageWithLayout } from "@/pages/_app";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/Public";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import PostMain from "@/components/Pages/PostDetail/PostMain";
import RelatedPosts from "@/components/Pages/PostDetail/RelatedPosts";
import Loading from "@/components/Loading";

const PostDetail: NextPageWithLayout = () => {
  const [fakeLoading, setFakeLoading] = useState(false);

  useEffect(() => {
    setFakeLoading(true);

    setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="postdetail">
      {fakeLoading ? (
        <div className="postdetail--loading">
          <Loading width={35} height={35} />
        </div>
      ) : (
        <>
          <PostMain />
          <RelatedPosts setFakeLoading={setFakeLoading}/>
        </>
      )}
    </div>
  );
};

PostDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PostDetail;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
};
