import type { FC } from "react";
import HomeReels from "./HomeReels";
import PostItem from "./PostItem";
import { posts } from "./data";
import { useSession } from "next-auth/react";

const HomeMain: FC = () => {
  const { data } = useSession()

  console.log(data)

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
