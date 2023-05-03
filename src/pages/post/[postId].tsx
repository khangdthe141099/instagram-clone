import type { NextPageWithLayout } from "@/pages/_app";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/Public";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import PostMain from "@/components/Pages/PostDetail/PostMain";
import RelatedPosts from "@/components/Pages/PostDetail/RelatedPosts";
import Loading from "@/components/Loading";
import { useAllPost } from "@/store/post/selector";
import { useRouter } from "next/router";

const PostDetail: NextPageWithLayout = () => {
  const [fakeLoading, setFakeLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>([]);

  const allPost = useAllPost();
  const route = useRouter();
  const { postId } = route.query;

  //First render:
  useEffect(() => {
    const crrPost = allPost.find((item: any) => item?._id === postId);

    setCurrentPost(crrPost);
  }, [allPost, postId]);

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
          <PostMain currentPost={currentPost}/>
          <RelatedPosts currentPost={currentPost} setFakeLoading={setFakeLoading}/>
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
