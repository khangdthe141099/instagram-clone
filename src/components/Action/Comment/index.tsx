import { COMMENT_TYPE } from "@/constant";
import CommentItem from "./CommentItem";
import { commentService } from "@/services/commentService";
import { useState, useEffect } from "react";
import { HTTP_STATUS_CONSTANTS } from "@/constant";

type CommentProps = {
  type?: "Less" | "More" | string;
  comment?: any;
};

const Comment = (props: CommentProps) => {
  const { type, comment } = props;


  return (
    <div className="comment-container">
      {type === COMMENT_TYPE.LESS && (
        <div className="comment-wrapper">
          {comment && comment.map((item: any, index: string) => (
            <CommentItem item={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
