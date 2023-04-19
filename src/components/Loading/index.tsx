import type { FC } from "react";
import Image from "next/image";

interface LoadingProps {
  width?: number;
  height?: number;
  style?: any;
}

const Loading = (props: LoadingProps) => {
  const { width, height, style } = props;

  return (
    <Image
      style={style}
      className="loading-icon"
      width={width || 24}
      height={height || 24}
      src={"/svg/loading.svg"}
      alt="More option"
    />
  );
};

export default Loading;
