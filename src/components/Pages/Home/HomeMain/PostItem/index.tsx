import Avatar from "@/components/Avatar";
import Image from "next/image";
import { useRef, useState } from "react";
import PostImage from "@/components/PostImage";
import Action from "@/components/Action";

type Comment = {
  peopleId?: string | number;
  content?: string;
};

interface IPostItem {
  id?: string | number;
  avatarUrl?: string;
  name?: string;
  time?: string;
  postUrl?: string[];
  likes?: number[] | string[];
  comments?: Comment[];
  stories?: number[] | string[]
}

const PostItem = (props: IPostItem) => {
  const { id, avatarUrl, comments, likes, name, postUrl, time, stories } = props;

  return (
    <div className="post-item">
      <div className="post-item--top">
        <div className="post-item--top-left">
          <div className="avatar">
            <Avatar
              stories={stories ? stories : []}
              img={avatarUrl}
              ringWidth={40}
              ringHeight={40}
              width={36}
              height={36}
            />
          </div>
          <h4>{name}</h4>
          <div className="time-post">
            <span>•</span>
            <time dateTime="2023-03-30T15:28:44.000Z" title="Mar 30, 2023">
              {time}
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
        <Action />
      </div>
    </div>
  );
};

export default PostItem;
