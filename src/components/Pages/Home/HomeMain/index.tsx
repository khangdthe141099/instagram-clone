import { FC, useEffect, useState } from "react";
import HomeReels from "./HomeReels";
import PostItem from "./PostItem";
import { useSession } from "next-auth/react";
import { useGetCurrentUser, useGetCurrentPost } from "@/pages/login/hooks";
import { useUserAction, useLoginMethod } from "@/store/user/selector";
import { useAllPostAction, useAllPost } from "@/store/post/selector";
import { LOGIN_TYPE } from "@/constant";
import Loading from "@/components/Loading";

const HomeMain: FC = () => {
  const [mounted, setMounted] = useState(false);

  const method = useLoginMethod();

  const { data } = useSession();
  const { image, ...rest } = data?.user as any;

  const handleSetUserDetail = useUserAction();
  const handleSetAllPost = useAllPostAction();

  const { currentUser, isLoading } = useGetCurrentUser(data?.user?.email!);
  const { currentPost } = useGetCurrentPost();

  const allPost = useAllPost();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    if (method === LOGIN_TYPE.CREDENTIALS) {
      handleSetUserDetail(currentUser);
    } else {
      handleSetUserDetail({
        ...rest,
        profileImg: image,
      });
    }
  }, [currentUser, handleSetUserDetail, image, method, rest]);

  useEffect(() => {
    if (!currentPost) return;

    handleSetAllPost(
      currentPost?.sort((a: any, b: any) => {
        const date1 = new Date(a.createdAt).valueOf();
        const date2 = new Date(b.createdAt).valueOf();
        return date2 - date1;
      })
    );
  }, [currentPost, handleSetAllPost]);

  return (
    <div className="homemain">
      <HomeReels />

      <div className="posts-list">
        {mounted ? (
          allPost?.map((item: any, index: any) => (
            <PostItem key={index} {...item} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default HomeMain;
