import type { FC } from "react";
import HomeReels from "./HomeReels";
import PostItem from "./PostItem";
import { posts } from "./data";

const HomeMain: FC = () => {
  return (
    <div className="homemain">
      <HomeReels />

      <div className="posts-list">
        {posts.map((item, index) => (
          <PostItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default HomeMain;
