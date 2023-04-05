import type { FC } from "react";
import Image from "next/image";

interface LoadingProps {}


const Loading = (props: LoadingProps) => {
  const {} = props;

  return (
    <Image
      className="loading-icon"
      width={24}
      height={24}
      src={"/svg/loading.svg"}
      alt="More option"
    />
  );
};

export default Loading;
