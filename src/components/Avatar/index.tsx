import Image from "next/image";
import classNames from "classnames";
interface AvatarProps {
  img?: any;
  ringWidth?: number;
  ringHeight?: number;
  width?: number;
  height?: number;
  stories?: string[] | number[];
}

const Avatar = (props: AvatarProps) => {
  const { img, ringWidth, ringHeight, width, height, stories } = props;

  return (
    <div
      style={
        stories?.length
          ? { width: ringWidth, height: ringHeight }
          : { width: "", height: "" }
      }
      className={classNames("avatar-box", { stories: stories?.length })}
    >
      <Image
        className="avatar-profile-image"
        src={img}
        alt=""
        width={width}
        height={height}
      />
    </div>
  );
};

export default Avatar;
