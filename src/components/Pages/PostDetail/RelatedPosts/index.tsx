import React from "react";
import { Typography, Skeleton } from "antd";
import PostItem from './PostItem'

const { Text } = Typography;

function RelatedPosts() {
  return (
    <div className="relatedposts">
      <div className="relatedposts-wrapper">
        <Text className="title">
          More posts from <span className="name">KhangDT</span>
        </Text>

        <div className="more-post-list">
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
      </div>
    </div>
  );
}

export default RelatedPosts;
