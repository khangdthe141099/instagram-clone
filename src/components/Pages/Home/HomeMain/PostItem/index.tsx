import Avatar from "@/components/Avatar";
import Image from "next/image";

import PostImage from "@/components/PostImage";
import Action from "@/components/Action";
import { useGetCurrentUser } from "@/pages/login/hooks";
import { useUserDetail } from "@/store/user/selector";
import OptionPost from "@/components/Pages/Home/Modal/OptionModal";
import { useModal } from "@/hooks/useModal";
import moment from "moment";
import { useRef, useState, useEffect } from "react";
import { useAllPostAction, useAllPost } from "@/store/post/selector";

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

  const allPost = useAllPost();

  const initialState = allPost.map((item: any, index: string) => ({
    postId: item._id,
    status: true,
  }));

  const initialState1 = allPost.map((item: any, index: string) => ({
    postId: item._id,
    status: true,
  }));

  const [displayLikeCount, setDisplayLikeCount] = useState<any>();
  const [displayComment, setDisplayComment] = useState<any>();

  useEffect(() => {
    setDisplayLikeCount(initialState);
    setDisplayComment(initialState1);
  }, [allPost]);

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
                img={currentUser?.profileImg}
                ringWidth={40}
                ringHeight={40}
                width={36}
                height={36}
              />
            </div>
            <h4>{currentUser?.username}</h4>
            <div className="time-post">
              <span>•</span>
              <time dateTime="2023-03-30T15:28:44.000Z" title="Mar 30, 2023">
                {fromNow}
              </time>
            </div>
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
          <PostImage postUrl={postUrl} />
        </div>

        <div className="post-item--bottom">
          <Action
            info={rest}
            userId={userId}
            postId={_id}
            displayLikeCount={displayLikeCount}
            displayComment={displayComment}
            setDisplayLikeCount={setDisplayLikeCount}
            setDisplayComment={setDisplayComment}
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
