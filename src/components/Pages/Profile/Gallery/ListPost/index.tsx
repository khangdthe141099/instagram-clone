import React, { useEffect, useState } from "react";
import { Typography, Skeleton } from "antd";
import PostItem from "./PostItem";
import { useAllPost, useAllPostAction } from "@/store/post/selector";

const { Text } = Typography;

function ListPost(props: any) {
  const [mounted, setMounted] = useState(false);
  const allPost = useAllPost();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="listpost">
      <div className="listpost--wrapper">
        {mounted &&
          allPost.map((item: any, index: string) => (
            <PostItem {...item} key={index} postId={item?._id} />
          ))}
      </div>
    </div>
  );
}

export default ListPost;
