import { useState } from "react";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import { Typography } from "antd";
import { useGetCurrentUser } from "@/pages/login/hooks";

type CommentItemProps = {
  item?: any;
  userId?: string;
};

const { Text } = Typography;

const CommentItem = ({ item, userId }: CommentItemProps) => {
  const [isViewReply, setIsViewReply] = useState<boolean>(false);

  const { currentUser } = useGetCurrentUser(userId!) as any;


  return (
    <>
      <div className="comment-top">
        <div className="comment-left">
          <Avatar
            img={currentUser?.profileImg}
            ringWidth={40}
            ringHeight={40}
            width={36}
            height={36}
          />

          <div className="comment-info">
            <div className="comment-info--top">
              <Text className="name">{currentUser?.username}</Text>
              <Text className="desc">{item?.content}</Text>
            </div>
            <div className="comment-info--bottom">
              <Text className="time">{item?.createdAt}</Text>
              <Text className="like">
                {item?.like?.length} {item?.like?.length > 1 ? "likes" : "like"}
              </Text>
              <Text className="reply">Reply</Text>
              <Image
                className="more-option-comment"
                width={24}
                height={24}
                src={"/svg/MoreOption.svg"}
                alt="More option"
              />
            </div>
          </div>
        </div>

        <div className="comment-right">
          <Image
            width={12}
            height={12}
            src={"/svg/components/post/HeartIcon.svg"}
            alt="More option"
          />
        </div>
      </div>

      {item?.replies.length > 1 ? (
        <div className="comment-bottom">
          <div className="divider"></div>
          <Text
            onClick={() => setIsViewReply((prev) => !prev)}
            className="comment-bottom--text"
          >
            {isViewReply ? `Hide replies (1)` : `View replies (1)`}
          </Text>
        </div>
      ) : null}
    </>
  );
};

export default CommentItem;
