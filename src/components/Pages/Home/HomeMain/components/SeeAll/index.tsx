import React from "react";
import Image from "next/image";
import { Typography } from "antd";
import Link from "next/link";
import { smoothScrollToRef } from "@/utils";

const { Text } = Typography;

interface ISeeAll {
  postRef?: any;
}

function SeeAll({ postRef }: ISeeAll) {
  return (
    <div className="seeallcontainer">
      <Image
        className="more-option-comment"
        width={96}
        height={96}
        src={"/images/post/see-all.png"}
        alt="More option"
      />
      <Text className="title">{`You're all caught up`}</Text>
      <Text className="desc">{`You've seen all new posts from the past 3 days`}</Text>
      <Text  className="view-link">
        View older posts
      </Text>
    </div>
  );
}

export default SeeAll;
