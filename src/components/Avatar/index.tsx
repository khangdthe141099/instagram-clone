import type { FC } from "react";
import Image from "next/image";

interface AvatarProps {
  img?: any;
  ringWidth?: number;
  ringHeight?: number;
  width?: number;
  height?: number;
}

const Avatar = (props: AvatarProps) => {
  const { img, ringWidth, ringHeight, width, height } = props;

  return (
    <div style={{ width: ringWidth, height: ringHeight }} className="avatar-box">
      <Image className="avatar-profile-image" src={img} alt="" width={width} height={height} />
    </div>
  );
};

export default Avatar;
