import Avatar from "@/components/Avatar";
import Image from "next/image";

import PostImage from "@/components/PostImage";
import Action from "@/components/Action";
import { useGetCurrentUser } from "@/pages/login/hooks";

type Comment = {
  peopleId?: string | number;
  content?: string;
};

interface IPostItem {
  _id?: string;
  postUrl?: string[];
  createdAt?: string;
  userId?: string;
  rest?: any;
}

const PostItem = (props: IPostItem) => {
  const { _id, postUrl, createdAt, userId, ...rest } = props;

  const { currentUser } = useGetCurrentUser(userId!) as any;


  return (
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
              {createdAt}
            </time>
          </div>
        </div>

        <div className="post-item--top-right">
          <Image
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
        <Action info={rest} userId={userId} postId={_id}/>
      </div>
    </div>
  );
};

export default PostItem;
