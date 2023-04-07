import { FC, useEffect } from "react";
import HomeReels from "./HomeReels";
import PostItem from "./PostItem";
import { posts } from "./data";
import { useSession } from "next-auth/react";
import useGetCurrentUser from "@/pages/login/hooks";
import {
  useUserAction,
  useUserDetail,
  useLoginMethod,
} from "@/store/user/selector";
import { LOGIN_TYPE } from "@/constant";

const HomeMain: FC = () => {
  const { data } = useSession();

  const { image, ...rest } = data?.user as any;

  const handleSetUserDetail = useUserAction();

  const method = useLoginMethod();

  const { currentUser, isLoading } = useGetCurrentUser(data?.user?.email!);

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

  return (
    <div className="homemain">
      <HomeReels />

      <div className="posts-list">
        {posts.map((item, index) => (
          <PostItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default HomeMain;
