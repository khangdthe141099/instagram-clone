import Avatar from "@/components/Avatar";
import Image from "next/image";

import PostImage from "@/components/PostImage";
import Action from "@/components/Action";
import { useGetCurrentUser,  } from "@/pages/login/hooks";
import { useUserDetail } from "@/store/user/selector";
import OptionPost from "@/components/Pages/Home/Modal/OptionModal";
import { useModal } from "@/hooks/useModal";
import moment from "moment";
import { useRef, useState, useEffect } from "react";
import { useAllPostAction, useAllPost } from "@/store/post/selector";
import { Skeleton } from "antd";
import { useGetPostById } from "@/components/Pages/Home/Modal/UpdatePost/hooks";

type Comment = {
  peopleId?: string | number;
  content?: string;
};

interface IPostItem {
  _id?: string;
  postUrl?: any;
  createdAt?: string;
  userId?: string;
  rest?: any;
  postRef?: any;
}

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "a few seconds ago",
    ss: "%ds",
    m: "%dm",
    mm: "%dm",
    h: "%dh",
    hh: "%dh",
    d: "%dd",
    dd: "%dd",
    M: "%dm",
    MM: "%dm",
    y: "%dy",
    yy: "%dy",
  },
});

const PostItem = (props: IPostItem) => {
  const { _id, postUrl, createdAt, userId, ...rest } = props;

  const [liked, setLiked] = useState<any>(false); //check display like icon
  const [likeCount, setLikeCount] = useState<any>(null); //number of like count
  const [textHideLike, setTextHideLike] = useState<any>(); //Content of text when click hide like count
  const [listUserLike, setListUserLike] = useState<any>([]);

  const { currentPost } = useGetPostById(_id) as any;

  const allPost = useAllPost();

  const initialState = allPost.map((item: any, index: string) => ({
    postId: item._id,
    status: true,
  }));

  const initialState1 = allPost.map((item: any, index: string) => ({
    postId: item._id,
    status: true,
  }));

  const [displayLikeCount, setDisplayLikeCount] = useState<any>(initialState);
  const [displayComment, setDisplayComment] = useState<any>(initialState1);

  const fromNow = moment(createdAt).fromNow();

  //active user
  const userDetail = useUserDetail();

  //User post corresponding:
  const { currentUser } = useGetCurrentUser(userId!) as any;

  const {
    open: openOptionPost,
    onOpenModal: onOpenOptionPost,
    onCloseModal: onCloseOptionPost,
  } = useModal();

  return (
    <>
      <div className="post-item">
        <div className="post-item--top">
          <div className="post-item--top-left">
            <div className="avatar">
              <Avatar
                stories={[]}
                img={currentUser?.profileImg || "/images/user/no_avatar.png"}
                ringWidth={40}
                ringHeight={40}
                width={36}
                height={36}
              />
            </div>
            <h4>
              {currentUser?.username || (
                <Skeleton.Input
                  style={{ height: 10, width: 180, marginTop: 4 }}
                  active={true}
                  size={"small"}
                  block={true}
                />
              )}
            </h4>
            {fromNow ? (
              <div className="time-post">
                <span>•</span>
                <time dateTime="2023-03-30T15:28:44.000Z" title="Mar 30, 2023">
                  {fromNow}
                </time>
              </div>
            ) : null}
          </div>

          <div onClick={onOpenOptionPost} className="post-item--top-right">
            <Image
              style={{ cursor: "pointer" }}
              className="more-option"
              width={24}
              height={24}
              src={"/svg/MoreOption.svg"}
              alt="More option"
            />
          </div>
        </div>

        <div className="post-item--body">
          <PostImage
            setLiked={setLiked}
            setLikeCount={setLikeCount}
            postUrl={postUrl}
            postId={_id}
            setListUserLike={setListUserLike}
            setTextHideLike={setTextHideLike}
            currentPost={currentPost}
          />
        </div>

        <div className="post-item--bottom">
          <Action
            info={rest}
            userId={userId}
            postId={_id}
            displayLikeCount={displayLikeCount}
            displayComment={displayComment}
            liked={liked}
            setLiked={setLiked}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
            textHideLike={textHideLike}
            setTextHideLike={setTextHideLike}
            listUserLike={listUserLike}
            setListUserLike={setListUserLike}
            currentPost={currentPost}
          />
        </div>
      </div>
      <OptionPost
        owner={userDetail?.email === userId}
        isModalOpen={openOptionPost}
        onCloseOptionPost={onCloseOptionPost}
        postId={_id}
        userId={userId}
        setDisplayLikeCount={setDisplayLikeCount}
        displayLikeCount={displayLikeCount}
        displayComment={displayComment}
        setDisplayComment={setDisplayComment}
      />
    </>
  );
};

export default PostItem;
