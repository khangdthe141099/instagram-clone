import Avatar from "@/components/Avatar";
import { Typography } from "antd";
import classNames from "classnames";

const { Text } = Typography;

interface IPersonTag {
  width?: number;
  height?: number;
  ringWidth?: number;
  ringHeight?: number;
  stories?: any;
  own?: boolean;
}

const PersonTag = (props: IPersonTag) => {
  const { height, ringHeight, ringWidth, stories, width, own = false } = props;

  return (
    <div className="persontag">
      <div className="persontag--left">
        <Avatar
          stories={stories?.length > 0 ? stories : []}
          img={
            "https://i.pinimg.com/originals/c0/4b/01/c04b017b6b9d1c189e15e6559aeb3ca8.png"
          }
          ringWidth={ringWidth}
          ringHeight={ringHeight}
          width={width}
          height={height}
        />
        <div className="info">
          <Text className="nickname">dt.khaqn_</Text>
          <Text className={classNames("name", {
          "suggestName": !own,
        })}>Dam Tuan Khang</Text>
        </div>
      </div>

      <Text
        className={classNames("option", {
          "option--hover": !own,
        })}
      >
        {own ? "Switch" : "Follow"}
      </Text>
    </div>
  );
};

export default PersonTag;
