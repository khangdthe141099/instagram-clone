import { useState } from "react";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import { Typography } from "antd";

type CommentItemProps = {
    item?: any
};

const { Text } = Typography;

const CommentItem = (props: CommentItemProps) => {
  const [isViewReply, setIsViewReply] = useState<boolean>(false)

  return (
    <>
      <div className="comment-top">
        <div className="comment-left">
          <Avatar
            img={
              "https://i.pinimg.com/originals/c0/4b/01/c04b017b6b9d1c189e15e6559aeb3ca8.png"
            }
            ringWidth={40}
            ringHeight={40}
            width={36}
            height={36}
          />

          <div className="comment-info">
            <div className="comment-info--top">
              <Text className="name">Khang</Text>
              <Text className="desc">Very nice</Text>
            </div>
            <div className="comment-info--bottom">
              <Text className="time">18h</Text>
              <Text className="like">7 likes</Text>
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

      <div className="comment-bottom">
        <div className="divider"></div>
        <Text onClick={() => setIsViewReply(prev => !prev)} className="comment-bottom--text">{isViewReply ? `Hide replies (1)` : `View replies (1)`}</Text>
      </div>
    </>
  );
};

export default CommentItem;
