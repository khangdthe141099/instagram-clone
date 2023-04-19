import Avatar from "@/components/Avatar";
import { Typography } from "antd";
import classNames from "classnames";
import { useState } from "react";

const { Text } = Typography;

interface IPersonTag {
  width?: number;
  height?: number;
  ringWidth?: number;
  ringHeight?: number;
  nicknameSz?: number;
  nameSz?: number;
  stories?: any;
  own?: boolean;
  typeFollow?: "string" | "button";
  data?: any;
}

const PersonTag = (props: IPersonTag) => {
  const {
    height,
    ringHeight,
    ringWidth,
    stories,
    width,
    own = false,
    nicknameSz,
    nameSz,
    typeFollow,
    data,
  } = props;

  const [follow, setFollow] = useState(false);


  const followRendering = () => {
    if (typeFollow === "string") {
      return (
        <Text
          className={classNames("option", {
            "option--hover": !own,
          })}
        >
          {own ? "Switch" : "Follow"}
        </Text>
      );
    }

    if (typeFollow === "button") {
      return (
        <button
          onClick={() => setFollow((prev) => !prev)}
          className={classNames("follow-btn", {
            following: follow,
          })}
        >
          {follow ? "following" : "follow"}
        </button>
      );
    }
  };

  return (
    <div className="persontag">
      <div className="persontag--left">
        <Avatar
          stories={stories?.length > 0 ? stories : []}
          img={data?.profileImg || "/images/user/no_avatar.png"}
          ringWidth={ringWidth}
          ringHeight={ringHeight}
          width={width}
          height={height}
        />
        <div className="info">
          <Text style={{ fontSize: nicknameSz }} className="nickname">
            {data?.username || 'Unknown user'}
          </Text>
          <Text
            style={{ fontSize: nameSz }}
            className={classNames("name", {
              suggestName: !own,
            })}
          >
            {data?.email || 'Unknown user'}
          </Text>
        </div>
      </div>

      {followRendering()}
    </div>
  );
};

export default PersonTag;
