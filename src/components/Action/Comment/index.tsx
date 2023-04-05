import { COMMENT_TYPE } from "@/constant";
import { comments } from "../const";
import CommentItem from './CommentItem'

type CommentProps = {
  type?: "Less" | "More" | string;
};

const Comment = (props: CommentProps) => {
  const { type } = props;

  return (
    <div className="comment-container">
      {type === COMMENT_TYPE.LESS && (
        <div className="comment-wrapper">
          {comments.map((item, index) => <CommentItem {...item} key={index}/>)}
        </div>
      )}
    </div>
  );
};

export default Comment;
