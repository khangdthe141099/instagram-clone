import React, { FC, useEffect, useState, useMemo } from "react";
import HomeReels from "./HomeReels";
import PostItem from "./PostItem";
import { useSession } from "next-auth/react";
import {
  useGetCurrentUser,
  useGetCurrentPost,
  useGetAllUser,
  useGetAllComment,
} from "@/pages/login/hooks";
import { useUserAction, useLoginMethod } from "@/store/user/selector";
import { useAllPostAction, useAllPost } from "@/store/post/selector";
import { useAllCommentAction } from "@/store/comment/selector";
import { LOGIN_TYPE, LIMIT_DEFAULT, OFF_SET_DEFAULT } from "@/constant";
import Loading from "@/components/Loading";
import PostSkeleton from "@/components/AppSkeleton/PostSkeleton";
import { userService } from "@/services/userService";
import { findUserByEmail } from "@/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import SeeAll from "./components/SeeAll";

const HomeMain: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(LIMIT_DEFAULT);

  const method = useLoginMethod();
  const { data } = useSession();
  const { image, ...rest } = data?.user as any;

  const { allUser } = useGetAllUser();
  const { currentUser } = useGetCurrentUser(data?.user?.email!);

  const allPost = useAllPost();
  const { currentPost, isLoading: loadingPost, total } = useGetCurrentPost();

  const { allComment, isLoading } = useGetAllComment();

  const handleSetUserDetail = useUserAction();
  const handleSetAllPost = useAllPostAction();
  const handleSetAllComment = useAllCommentAction();

  useEffect(() => {
    setMounted(true);
  }, []);

  //List post to render interface:
  const postRender: any = useMemo(() => {
    if (!allPost) return;

    return allPost.slice(0, limit);
  }, [allPost, limit]);

  useEffect(() => {
    if (!currentPost) return;

    handleSetAllPost(currentPost);
  }, [currentPost]);

  //Add more post to current list:
  const fetchMoreData = () => {
    setTimeout(() => {
      if (postRender?.length >= total!) {
        setHasMore(false);
        return;
      } else setLimit((prev) => prev + OFF_SET_DEFAULT);
    }, 1500);
  };

  //Add user to list user if donn't already exist:
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
    if (!allComment) return;

    if (allComment) handleSetAllComment(allComment);
  }, [allComment]);

  const renderListPost = () => {
    if (loadingPost) {
      return (
        <div className="loading-skeleton">
          <PostSkeleton />
        </div>
      );
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
      return postRender
        .slice(0, limit)
        ?.map((item: any, index: any) => <PostItem key={index} {...item} />);
    }
  };

  return (
    <div className="homemain">
      <HomeReels />

      {mounted && (
        <div id="scrollableDiv" className="posts-list">
          <InfiniteScroll
            dataLength={postRender.slice(0, limit)?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              postRender.slice(0, limit)?.length ? (
                <div className="post-loader">
                  <Loading />
                </div>
              ) : (
                ""
              )
            }
            scrollableTarget="scrollableDiv"
            style={{ overflow: "hidden" }}
            endMessage={<SeeAll />}
          >
            {renderListPost()}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default HomeMain;
