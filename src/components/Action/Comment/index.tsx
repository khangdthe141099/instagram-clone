import { COMMENT_TYPE } from "@/constant";
import CommentItem from "./CommentItem";
import { commentService } from "@/services/commentService";
import { useState, useEffect } from "react";
import { HTTP_STATUS_CONSTANTS } from "@/constant";

type CommentProps = {
  type?: "Less" | "More" | string;
  postId?: string,
  userId?: string,
};

const Comment = (props: CommentProps) => {
  const { type, postId, userId } = props;
  const [comment, setComment] = useState<any[]>();

  useEffect(() => {
    (async () => {
      try {
        const { data, status }: any = await commentService.getCommentByPostId(postId!);

        if (status === HTTP_STATUS_CONSTANTS.OK) setComment(data.comment);
      } catch (e) {
      
      }
    })();
  }, [postId]);

  return (
    <div className="comment-container">
      {type === COMMENT_TYPE.LESS && (
        <div className="comment-wrapper">
          {comment && comment.map((item, index) => (
            <CommentItem item={item} key={index} userId={userId}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
