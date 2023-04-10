import { FC, useEffect, useState } from "react";
import HomeReels from "./HomeReels";
import PostItem from "./PostItem";
import { posts } from "./data";
import { useSession } from "next-auth/react";
import { useGetCurrentUser, useGetCurrentPost } from "@/pages/login/hooks";
import { useUserAction, useLoginMethod } from "@/store/user/selector";
import { useAllPostAction, useAllPost } from "@/store/post/selector";
import { LOGIN_TYPE } from "@/constant";

const HomeMain: FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const method = useLoginMethod();

  const { data } = useSession();
  const { image, ...rest } = data?.user as any;

  const handleSetUserDetail = useUserAction();
  const handleSetAllPost = useAllPostAction();

  const { currentUser, isLoading } = useGetCurrentUser(data?.user?.email!);
  const { currentPost } = useGetCurrentPost();

  const allPost = useAllPost()

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

    handleSetAllPost(currentPost);
  }, [currentPost, handleSetAllPost]);

  return (
    <div className="homemain">
      <HomeReels />

      <div className="posts-list">
        {allPost.map((item: any, index: any) => (
          mounted && <PostItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default HomeMain;
