import { useState } from "react";
import Image from "next/image";
import { Tooltip, Typography } from "antd";
import { action } from "./const";
import Comment from "./Comment";
import { COMMENT_TYPE } from "@/constant";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { Popover } from "antd";
import { useGetCurrentUser } from "@/pages/login/hooks";

interface ActionProps {
  info?: any;
  userId?: string;
  postId?: string;
  displayLikeCount?: any;
  displayComment?: any;
}

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const { Text } = Typography;

const Action = ({
  info,
  userId,
  postId,
  displayLikeCount,
  displayComment,
}: ActionProps) => {
  const { currentUser } = useGetCurrentUser(userId!) as any;

  const { comments, likes, postDesc } = info;

  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handlePostComment = (e: any) => {
    setCommentText(e.target.value);
  };

  const actionRendering = (item: any, index: number) => {
    const { id, name, icon, activeIcon, width, height } = item;

    return (
      <div
        className={classNames("action-icon--left-item", {
          like: item?.name === "Like",
        })}
      >
        <Tooltip key={index} title={name}>
          <Image width={width} height={height} src={icon} alt={name} />
        </Tooltip>
      </div>
    );
  };

  return (
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

      <Text className="like-count">
        {displayLikeCount()?.status ? likes?.length : "Liked by Dam tuan khang"}
        {displayLikeCount()?.status
          ? likes?.length > 1
            ? " likes"
            : " like"
          : ""}
      </Text>

      <div className="post-desc">
        <div className="post-desc--top">
          <span className="author">{currentUser?.username}</span>
          <span className="desc">{postDesc}</span>
        </div>

        {comments?.length ? (
          <>
            <div className="post-desc--bottom">
              View all {comments?.length} comments
            </div>
            <Comment type={COMMENT_TYPE.LESS} postId={postId} userId={userId} />
          </>
        ) : null}
      </div>

      {displayComment()?.status && (
        <div className="post-comment">
          <input
            value={commentText}
            onChange={handlePostComment}
            placeholder="Add a comment..."
            className="post-comment--input"
            type="text"
          />
          {commentText && <Text className="post-comment--text">Post</Text>}
          <Popover
            content={<Picker width={300} height={350} />}
            title="Title"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Image
              style={{ cursor: "pointer" }}
              width={13}
              height={13}
              src={"/svg/components/post/EmojiIcon.svg"}
              alt="Emoji Icon"
            />
          </Popover>
        </div>
      )}
    </div>
  );
};

export default Action;
