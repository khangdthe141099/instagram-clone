import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Tooltip, Typography, Popover } from "antd";
import { action, ACTION_KEY } from "./const";
import Comment from "./Comment";
import { COMMENT_TYPE } from "@/constant";
import classNames from "classnames";
import {
  useGetCurrentUser,
  useGetAllUser,
} from "@/pages/login/hooks";
import { postService } from "@/services/postService";
import Link from "next/link";
import ListLikeModal from "@/components/Pages/Home/Modal/ListLikeModal";
import { useModal } from "@/hooks/useModal";
import { useUserDetail } from "@/store/user/selector";
import { useAllComment, useAllCommentAction } from "@/store/comment/selector";
import { Picker, sortCurrenComment } from "@/utils";
import { commentService } from "@/services/commentService";
import Loading from "@/components/Loading";
import { useFocus } from "@/hooks/useFocus";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ActionProps {
  info?: any;
  userId?: string;
  postId?: string;
  displayLikeCount?: any;
  displayComment?: any;
  liked?: any;
  setLiked?: any;
  likeCount?: any;
  setLikeCount?: any;
  textHideLike?: any;
  setTextHideLike?: any;
  listUserLike?: any;
  setListUserLike?: any;
  currentPost?: any;
}

const { Text } = Typography;

const Action = ({
  info,
  userId,
  postId,
  displayLikeCount,
  displayComment,
  liked,
  likeCount,
  setLikeCount,
  setLiked,
  listUserLike,
  setListUserLike,
  setTextHideLike,
  textHideLike,
  currentPost,
}: ActionProps) => {
  const { open: openModal, onOpenModal, onCloseModal } = useModal();
  const { inputRef, setFocus } = useFocus();
  const router = useRouter();

  const { currentUser } = useGetCurrentUser(userId!) as any;
  const { allUser } = useGetAllUser();

  const { likes, postDesc } = info;

  const comments = useAllComment();
  const handleSetAllComment = useAllCommentAction();

  //active user
  const userDetail = useUserDetail();

  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState(""); //check display post comment btn
  const [comment, setComment] = useState({
    data: null,
    length: 0,
  });
  const [loading, setLoading] = useState(false);

  const checkExistLike = (arr: any) => {
    if (arr) {
      const idx = arr?.findIndex((item: any) => item === userDetail?.email);

      return idx;
    }
  };

  useEffect(() => {
    if (likes?.length === 0) {
      setLiked(false);
    }

    const idx = checkExistLike(currentPost?.likes);

    setLiked(idx !== -1);
  }, [currentPost?.likes, userDetail]);

  useEffect(() => {
    setLikeCount(likes?.length);
  }, [likes, userDetail]);

  const listLikedUsersRendering = () => {
    const listLikedUsers: any = allUser?.filter((user: any) =>
      currentPost?.likes?.includes(user.email)
    );

    setListUserLike(listLikedUsers);

    listLikedUsers.length
      ? setTextHideLike(
          <span>
            Liked by <Link href={""}>{listLikedUsers?.[0]?.username}</Link>{" "}
            {listLikedUsers.length > 1 && <span>and others</span>}
          </span>
        )
      : setTextHideLike(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleCommentChange = (e: any) => {
    setCommentText(e.target.value);
  };

  const handleEmojiClick = (emoji: any, event: MouseEvent) => {
    setCommentText((prev) => (prev += `${emoji?.emoji}`));
  };

  const getListLikeUpdate = () => {
    const idx = checkExistLike(currentPost?.likes);
    if (idx === -1) currentPost?.likes.push(userDetail?.email);
    else currentPost?.likes.splice(idx, 1);

    return currentPost?.likes;
  };

  const handleClickAction = (key: string) => {
    if (key == ACTION_KEY.LIKE) {
      setLiked((prev: any) => !prev);

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
      const comment = getCoresspondingComment();

      if (!comment.status) {
        toast("Please turn on comment !");
        return;
      }

      setFocus();
    }
  };

  const iconRendering = (key: string, icon: any, activeIcon: any) => {
    if (key === ACTION_KEY.LIKE) {
      return liked ? activeIcon : icon;
    }

    return icon;
  };

  const actionRendering = (item: any, index: number) => {
    const { id, name, key, icon, activeIcon, width, height } = item;

    return (
      <div
        className={classNames("action-icon--left-item", {
          like: item?.name === "Like",
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

  const getCoresspondingLikeCount = () => {
    const itemCoressponding = displayLikeCount?.find(
      (item: any) => item.postId === postId
    );

    return itemCoressponding;
  };

  const getCoresspondingComment = () => {
    const itemCoressponding = displayComment?.find(
      (item: any) => item.postId === postId
    );

    return itemCoressponding;
  };

  const handleOpenListLike = () => {
    if (likeCount > 0) {
      onOpenModal();
    }
  };

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

  useEffect(() => {
    listLikedUsersRendering();
  }, [allUser, currentPost?.likes, userDetail]);

  useEffect(() => {
    const comment = comments?.filter((item: any) => item.postId === postId);
    sortCurrenComment(comment);
    setComment({
      data: comment.slice(0, 2),
      length: comment.length,
    });
  }, [comments, postId]);

  return (
    <>
      <div className="action-container">
        <div className="action-icon">
          <div className="action-icon--left">
            {action.map((item, index) => actionRendering(item, index))}
          </div>

          <div className="action-icon--right">
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

        <Text onClick={handleOpenListLike} className="like-count">
          {getCoresspondingLikeCount()?.status ? likeCount : textHideLike}
          {getCoresspondingLikeCount()?.status
            ? likeCount > 1
              ? " likes"
              : " like"
            : ""}
        </Text>

        <div className="post-desc">
          <div className="post-desc--top">
            <span className="author">{currentUser?.username}</span>
            <span className="desc">{postDesc}</span>
          </div>

          {comment?.length > 0 ? (
            <>
              <div
                onClick={() => router.push(`/post/${postId}`)}
                className="post-desc--bottom"
              >
                View all {comment?.length} comments
              </div>
              <Comment type={COMMENT_TYPE.LESS} comment={comment?.data} />
            </>
          ) : null}
        </div>

        {getCoresspondingComment()?.status && (
          <div className="post-comment">
            <form onSubmit={handlePostComment}>
              <input
                ref={inputRef}
                value={commentText}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className="post-comment--input"
                type="text"
              />
            </form>
            {commentText && (
              <Text onClick={handlePostComment} className="post-comment--text">
                {loading ? <Loading width={18} height={18} /> : "Post"}
              </Text>
            )}
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
                width={20}
                height={13}
                src={"/svg/components/post/EmojiIcon.svg"}
                alt="Emoji Icon"
              />
            </Popover>
          </div>
        )}
      </div>
      <ListLikeModal
        listUserLike={listUserLike}
        isModalOpen={openModal}
        onCloseModal={onCloseModal}
      />
      <ToastContainer />
    </>
  );
};

export default Action;
