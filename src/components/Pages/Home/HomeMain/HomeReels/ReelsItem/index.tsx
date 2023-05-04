import type { FC } from "react";
import { Tooltip } from "antd";
import Avatar from "@/components/Avatar";

interface IReelsItem {
  img?: any;
  name?: string;
  circleWidth?: any;
  circleHeight?: number;
}

const ReelsItem = ({
  img,
  name,
  circleWidth = 56,
  circleHeight = 56,
}: IReelsItem) => {
  return (
    <section className="avatar-detail">
      <Avatar
        img={img}
        ringWidth={circleWidth + 4}
        ringHeight={circleHeight + 4}
        width={circleWidth}
        height={circleHeight}
      />
      <Tooltip title={name}>
        <p className="avatar-name">{name}</p>
      </Tooltip>
    </section>
  );
};

export default ReelsItem;
