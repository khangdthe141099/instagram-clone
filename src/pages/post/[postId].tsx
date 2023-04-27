import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";
import Layout from "@/components/Layout/Public";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import PostMain from "@/components/Pages/PostDetail/PostMain";
import RelatedPosts from "@/components/Pages/PostDetail/RelatedPosts";

const PostDetail: NextPageWithLayout = () => {
  return (
    <div className="postdetail">
      <PostMain />
      <RelatedPosts />
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
