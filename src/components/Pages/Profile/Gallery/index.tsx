import React from "react";
import { Tabs, Typography } from "antd";
import type { TabsProps } from "antd";
import Image from "next/image";
import ListPost from "./ListPost";

const { Text } = Typography;

function Gallery() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <Image
            width={12}
            height={12}
            src="/svg/components/profile/PostIcon.svg"
            alt="post icon"
          />
          <Text>Posts</Text>
        </div>
      ),
      children: <ListPost />,
    },
    {
      key: "2",
      label: (
        <div>
          <Image
            width={12}
            height={12}
            src="/svg/components/profile/ReelIcon.svg"
            alt="video icon"
          />
          <Text>Video</Text>
        </div>
      ),
      children: `Content of Tab Pane 2`,
    },
  ];
  return (
    <div className="gallery">
      <Tabs
        tabBarGutter={40}
        centered
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}

export default Gallery;
