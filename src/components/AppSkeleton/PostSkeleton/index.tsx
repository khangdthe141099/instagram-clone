import React from "react";
import { Skeleton } from "antd";

interface IPostSkeleton {
  widthAva?: number | string;
  heightAva?: number | string;
  widthLine1?: number | string;
  heightLine1?: number | string;
  widthLine2?: number | string;
  heightLine2?: number | string;
  widthImg?: number | string;
  heightImg?: number | string;
}

function PostSkeleton({
  widthAva = 40,
  heightAva = 40,
  widthLine1,
  heightLine1 = 10,
  widthLine2 = 10,
  heightLine2 = 10,
  widthImg,
  heightImg = 450
}: IPostSkeleton) {
  return (
    <div className="post-ske-container">
      <div className="post-ske-top">
        <Skeleton.Avatar
          style={{ width: widthAva, height: heightAva }}
          className="post-ske-ava"
          active={true}
          size={"default"}
        />
        <div className="post-ske-title">
          <Skeleton.Input
            style={{ height: heightLine1 }}
            active={true}
            size={"small"}
            block={true}
          />
          <Skeleton.Input
            style={{ height: heightLine2, width: widthLine2 }}
            active={true}
            size={"small"}
            block={true}
          />
        </div>
      </div>
      <div className="post-ske-img">
        <Skeleton.Image
          style={{ width: widthImg || "100%", height: heightImg }}
          active={true}
        />
      </div>
    </div>
  );
}

export default PostSkeleton;
