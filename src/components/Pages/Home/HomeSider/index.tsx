import type { FC } from "react";
import Avatar from "@/components/Avatar";
import { Typography } from "antd";
import PersonTag from "./PersonTag";

const { Text } = Typography;

const HomeSider: FC = () => {
  return (
    <div className="homesider">
      <div className="homesider-top">
        <PersonTag
          width={66}
          height={66}
          ringWidth={70}
          ringHeight={70}
          stories={[]}
          own
        />
      </div>

      <div className="homesider-bottom">
        <div className="homesider-bottom--title">
          <Text className="suggest">Suggestions for you</Text>
          <Text className="seeall">See All</Text>
        </div>

        <div className="homesider-bottom--body">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div className="suggestion-item" key={index}>
              <PersonTag
                width={32}
                height={32}
                ringWidth={36}
                ringHeight={36}
                stories={[]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSider;
