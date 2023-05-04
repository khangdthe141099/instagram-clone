import Image from "next/image";
import classNames from "classnames";
interface AvatarProps {
  img?: any;
  ringWidth?: number | any;
  ringHeight?: number | any;
  width?: number | any;
  height?: number | any;
  stories?: string[] | number[];
}

const Avatar = (props: AvatarProps) => {
  const {
    img,
    ringWidth = 40,
    ringHeight = 40,
    width = 36,
    height = 36,
    stories,
  } = props;

  return (
    <div
      style={{ width: ringWidth, height: ringHeight }}
      className={classNames("avatar-box", { stories: stories?.length })}
    >
      <Image
        loader={() => img}
        className="avatar-profile-image"
        src={img || ""}
        alt=""
        width={width}
        height={height}
      />
    </div>
  );
};

export default Avatar;
