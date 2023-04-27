import React, { useState, useEffect } from "react";
import PostImage from "@/components/PostImage";
import Avatar from "@/components/Avatar";
import { Typography, Tooltip, Popover, Skeleton } from "antd";
import Image from "next/image";
import Comment from "@/components/Action/Comment";
import { COMMENT_TYPE, MONTH_DATE_FORMAT } from "@/constant";
import { action, ACTION_KEY } from "@/components/Action/const";
import classNames from "classnames";
import Loading from "@/components/Loading";
import { Picker, sortCurrenComment, isOwner } from "@/utils";
import { useRouter } from "next/router";
import { useGetPostById } from "@/components/Pages/Home/Modal/UpdatePost/hooks";
import {
  useGetCurrentUser,
  useGetAllUser,
  useGetAllComment,
} from "@/pages/login/hooks";
import moment from "moment";
import { useAllComment, useAllCommentAction } from "@/store/comment/selector";
import { useUserDetail } from "@/store/user/selector";
import { commentService } from "@/services/commentService";
import { postService } from "@/services/postService";
import ListLikeModal from "@/components/Pages/Home/Modal/ListLikeModal";
import { useModal } from "@/hooks/useModal";
import NoComment from "./NoData/NoComment";
import NoLike from "./NoData/NoLike";
import PostSkeleton from "@/components/AppSkeleton/PostSkeleton";
import OptionPost from "@/components/Pages/Home/Modal/OptionModal";
import { useAllPostAction, useAllPost } from "@/store/post/selector";
import { TYPE_OPTION_MODAL } from "@/constant";

const { Text } = Typography;

function PostMain() {
  const { open: openModal, onOpenModal, onCloseModal } = useModal();

  const {
    open: openOptionPost,
    onOpenModal: onOpenOptionPost,
    onCloseModal: onCloseOptionPost,
  } = useModal();

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState<any>(null);
  const [listUserLike, setListUserLike] = useState<any>([]);

  const route = useRouter();
  const { postId } = route.query;
  const { currentPost, isLoading } = useGetPostById(postId) as any;
  const { currentUser } = useGetCurrentUser(currentPost?.userId) as any;
  const userDetail = useUserDetail();
  const { allUser } = useGetAllUser();
  const { allComment, isLoading: loadingComment } = useGetAllComment();
  const allPost = useAllPost();
  const comments = useAllComment();
  const handleSetAllComment = useAllCommentAction();
  //Check if the current user is the post author or not
  const owner = isOwner(currentPost, userDetail);
  const dateFormat = moment(currentPost?.updatedAt).format(MONTH_DATE_FORMAT);

  //============START ON OFF HIDE LIKE COUNT AND COMMENT ========
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

  const getCoresspondingComment = () => {
    const itemCoressponding = displayComment?.find(
      (item: any) => item.postId === postId
    );

    return itemCoressponding;
  };

  //============END ON OFF HIDE LIKE COUNT AND COMMENT ========

  //============ START LIKE ACTION =========================
  const checkExistLike = (arr: any) => {
    if (arr) {
      const idx = arr?.findIndex((item: any) => item === userDetail?.email);

      return idx;
    }
  };

  const renderLikeCount = () => {
    if (likeCount > 0 && !isLoading) {
      return `${likeCount} ${likeCount > 1 ? "likes" : "like"}`;
    }
    if (likeCount <= 0 && !isLoading) return <NoLike />;
  };

  const handleOpenListLike = () => {
    if (likeCount > 0) {
      onOpenModal();
    }
  };

  const getListLikeUpdate = () => {
    const idx = checkExistLike(currentPost?.likes);
    if (idx === -1) currentPost?.likes.push(userDetail?.email);
    else currentPost?.likes.splice(idx, 1);

    return currentPost?.likes;
  };

  const listLikedUsersRendering = () => {
    const listLikedUsers: any = allUser?.filter((user: any) =>
      currentPost?.likes?.includes(user.email)
    );

    setListUserLike(listLikedUsers);
  };

  useEffect(() => {
    setLikeCount(currentPost?.likes?.length);
  }, [currentPost?.likes, userDetail]);

  useEffect(() => {
    const idx = checkExistLike(currentPost?.likes);

    setLiked(idx !== -1);
  }, [currentPost?.likes, userDetail]);

  useEffect(() => {
    listLikedUsersRendering();
  }, [allUser, currentPost?.likes, userDetail]);

  //============ END LIKE ACTION ============================

  //============ START COMMENT ACTION ======================

  //Comment actions:
  const handlePostComment = async (e: any) => {
    e.preventDefault();

    if (!commentText) return;

    setLoading(true);

    commentService
      .createComment({
        userId: userDetail?.email || "",
        postId: postId || "",
        content: commentText || "",
        likes: [],
        replies: [],
      })
      .then((res: any) => {
        setCommentText("");
        setLoading(false);
        const newComment = [...comments];
        newComment.push(res?.data?.comment);
        sortCurrenComment(newComment);
        handleSetAllComment(newComment);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleCommentChange = (e: any) => {
    setCommentText(e.target.value);
  };

  const handleEmojiClick = (emoji: any, event: MouseEvent) => {
    setCommentText((prev) => (prev += `${emoji?.emoji}`));
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const renderComment = () => {
    if (!loadingComment && comment?.length > 0) {
      return <Comment type={COMMENT_TYPE.LESS} comment={comment} />;
    }

    if (!loadingComment && comment?.length <= 0) return <NoComment />;
  };

  useEffect(() => {
    const comment = comments?.filter((item: any) => item.postId === postId);
    sortCurrenComment(comment);
    setComment(comment);
  }, [comments, postId]);

  useEffect(() => {
    if (!allComment) return;

    if (allComment) handleSetAllComment(allComment);
  }, [allComment]);
  //============ END COMMENT ACTION ========================

  //Like actions:
  const handleClickAction = (key: string) => {
    if (key == ACTION_KEY.LIKE) {
      setLiked((prev) => !prev);

      const idx = checkExistLike(currentPost?.likes);
      if (idx === -1) setLikeCount((prev: any) => prev + 1);
      else setLikeCount((prev: any) => prev - 1);

      postService
        .likePost(postId, {
          likes: getListLikeUpdate() || [],
        })
        .then((res: any) => {
          console.log(res);
          listLikedUsersRendering();
        })
        .catch((err) => {
          console.log("loi:> ", err);
        });
    }

    if (key === ACTION_KEY.COMMENT) {
    }
  };

  //Render item
  const iconRendering = (key: string, icon: any, activeIcon: any) => {
    if (key === ACTION_KEY.LIKE) {
      return liked ? activeIcon : icon;
    }

    return icon;
  };

  //Render item
  const actionRendering = (item: any, index: number) => {
    const { id, name, key, icon, activeIcon, width, height } = item;

    return (
      <div
        className={classNames("icon-item", {
          "icon-item--like": item?.name === "Like",
        })}
      >
        <Tooltip key={index} title={name}>
          <Image
            onClick={() => handleClickAction(key)}
            width={width}
            height={height}
            src={iconRendering(key, icon, activeIcon)}
            alt={name}
          />
        </Tooltip>
      </div>
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="postmain">
        {mounted && (
          <div className="postmain-wrapper">
            <div className="postmain-wrapper--left">
              {currentPost?.postUrl ? (
                <PostImage
                  postUrl={currentPost?.postUrl}
                  widthImg={479}
                  heightImg={600}
                />
              ) : (
                <div className="postmain-loading">
                  <PostSkeleton hasHeader={false} heightImg={597} />
                </div>
              )}
            </div>

            <div className="postmain-wrapper--right">
              <div className="postmain-info">
                <div className="postmain-info--left">
                  <Avatar
                    stories={[]}
                    img={
                      currentUser?.profileImg || "/images/user/no_avatar.png"
                    }
                    ringWidth={46}
                    ringHeight={46}
                    width={42}
                    height={42}
                  />
                  <Text className="name">
                    {currentUser?.username || (
                      <Skeleton.Input
                        style={{ height: 10 }}
                        active={true}
                        size={"small"}
                        block={true}
                      />
                    )}
                  </Text>
                  {!isLoading && !owner && (
                    <>
                      <Text className="dot">•</Text>
                      <Text className="follow-text">Follow</Text>
                    </>
                  )}
                </div>

                <div
                  onClick={onOpenOptionPost}
                  className="postmain-info--right"
                >
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

              <div className="postmain-listcmt">
                <div className="postmain-user">
                  <Text className="username">
                    {currentUser?.username || (
                      <Skeleton.Input
                        style={{ height: 10 }}
                        active={true}
                        size={"small"}
                        block={true}
                      />
                    )}
                  </Text>
                  <Text className="desc">
                    {!isLoading && currentPost ? (
                      currentPost?.postDesc
                    ) : (
                      <Skeleton.Input
                        style={{ height: 10 }}
                        active={true}
                        size={"small"}
                        block={true}
                      />
                    )}
                  </Text>
                </div>
                {renderComment()}
              </div>

              <div className="postmain-action">
                <div className="postmain-action--left">
                  {action.map((item, index) => actionRendering(item, index))}
                </div>

                <div className="postmain-action--right">
                  <Tooltip title="Save">
                    <Image
                      width={24}
                      height={24}
                      src={"/svg/components/post/SaveIcon.svg"}
                      alt="Save"
                    />
                  </Tooltip>
                </div>
              </div>

              <div className="time">
                <Text onClick={handleOpenListLike} className="like-count">
                  {renderLikeCount()}
                </Text>
                <Text className="date">{dateFormat}</Text>
              </div>

              {getCoresspondingComment()?.status && (
                <div className="postmain-comment">
                  <form onSubmit={handlePostComment}>
                    <input
                      value={commentText}
                      onChange={handleCommentChange}
                      placeholder="Add a comment..."
                      className="post-comment--input"
                      type="text"
                    />
                  </form>
                  <Text
                    onClick={handlePostComment}
                    className={classNames("post-comment--text", {
                      "post-comment--text-disabled": !commentText,
                    })}
                  >
                    {loading ? <Loading width={18} height={18} /> : "Post"}
                  </Text>
                  <Popover
                    content={
                      <Picker
                        onEmojiClick={handleEmojiClick}
                        width={300}
                        height={350}
                      />
                    }
                    title="Pick you emoji"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                  >
                    <Image
                      style={{ cursor: "pointer" }}
                      width={24}
                      height={24}
                      src={"/svg/components/post/EmojiIcon.svg"}
                      alt="Emoji Icon"
                    />
                  </Popover>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <ListLikeModal
        listUserLike={listUserLike}
        isModalOpen={openModal}
        onCloseModal={onCloseModal}
      />
      <OptionPost
        typeModal={TYPE_OPTION_MODAL.DETAIL}
        owner={owner}
        isModalOpen={openOptionPost}
        onCloseOptionPost={onCloseOptionPost}
        postId={postId}
        userId={currentPost?.userId}
        setDisplayLikeCount={setDisplayLikeCount}
        displayLikeCount={displayLikeCount}
        displayComment={displayComment}
        setDisplayComment={setDisplayComment}
      />
    </>
  );
}

export default PostMain;
