import { FC, useEffect, useState } from "react";
import HomeReels from "./HomeReels";
import PostItem from "./PostItem";
import { useSession } from "next-auth/react";
import {
  useGetCurrentUser,
  useGetCurrentPost,
  useGetAllUser,
} from "@/pages/login/hooks";
import { useUserAction, useLoginMethod } from "@/store/user/selector";
import { useAllPostAction, useAllPost } from "@/store/post/selector";
import { LOGIN_TYPE } from "@/constant";
import Loading from "@/components/Loading";
import { useCreateModal } from "@/store/modal/selector";
import PostSkeleton from "@/components/AppSkeleton/PostSkeleton";
import { userService } from "@/services/userService";
import { findUserByEmail } from "@/utils";

const HomeMain: FC = () => {
  const { onOpenCreatePost } = useCreateModal();

  const [mounted, setMounted] = useState(false);

  const method = useLoginMethod();

  const { data } = useSession();
  const { image, ...rest } = data?.user as any;

  const allPost = useAllPost();

  const handleSetUserDetail = useUserAction();
  const handleSetAllPost = useAllPostAction();

  const { allUser } = useGetAllUser();
  const { currentUser } = useGetCurrentUser(data?.user?.email!);
  const { currentPost, isLoading: loadingPost } = useGetCurrentPost();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const user = findUserByEmail(allUser, data?.user?.email!);

    async function addUser() {
      try {
        userService
          .createUser({
            email: data?.user?.email,
            fullname: "",
            username: data?.user?.name,
            password: "",
            profileImg: data?.user?.image,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err: any) {
        throw new Error(err);
      }
    }

    if (method !== LOGIN_TYPE.CREDENTIALS && !user) {
      addUser();
    }
  }, [allUser, data?.user, image, method, rest]);

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


  const renderListPost = () => {
    if (!mounted) return <Loading />;

    if (loadingPost) {
      return <PostSkeleton />;
    } else {
      // if (allPost && allPost.length === 0)
      //   return (
      //     <div className="no-post">
      //       There are currently no posts, please{" "}
      //       <span onClick={onOpenCreatePost} className="no-post--link">
      //         create a post
      //       </span>{" "}
      //       or <span className="no-post--link">follow new friend</span> to see
      //       more...
      //     </div>
      //   );
      return allPost?.map((item: any, index: any) => (
        <PostItem key={index} {...item} />
      ));
    }
  };

  return (
    <div className="homemain">
      <HomeReels />

      <div className="posts-list">{renderListPost()}</div>
    </div>
  );
};

export default HomeMain;
