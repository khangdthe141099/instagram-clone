import Avatar from "@/components/Avatar";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import NormalButton from "@/components/AppButton/NormalButton";
import Image from "next/image";
import { FOLLOW_TYPE } from "@/constant";
import Loading from "@/components/Loading";
import Follow from "./components/Follow";
import { useRouter } from "next/router";
import { useUserDetail } from "@/store/user/selector";

const { Text } = Typography;

function Detail() {
  const route = useRouter();
  const { username } = route.query;

  const [owner, setOwner] = useState(true);
  const activeUser = useUserDetail();

  useEffect(() => {
    setOwner(activeUser?.email === username);
  }, [activeUser, username]);

  const renderAction = () => {
    if (owner) {
      return (
        <div className="action--list-owner">
          <div onClick={() => route.push("/profile/edit")}>
            <NormalButton
              width={102}
              height={32}
              color="#EFEFEF"
              text="Edit profile"
            />
          </div>
          <Image
            style={{ marginLeft: 15, cursor: "pointer" }}
            width={24}
            height={24}
            src="/svg/components/post/ProfileOptions.svg"
            alt="profile options"
          />
        </div>
      );
    } else {
      return (
        <div className="action--list-guest">
          <Follow />

          <div className="btn">
            <NormalButton width={88} height={32} text="Message" />
          </div>
          <Image
            style={{ cursor: "pointer" }}
            width={32}
            height={32}
            src="/svg/MoreOption.svg"
            alt="more options"
          />
        </div>
      );
    }
  };

  return (
    <div className="profile-detail">
      <div className="profile-detail--left">
        <Avatar
          img="https://i.pinimg.com/736x/71/fe/83/71fe83b3f2423bb24a925ff72565fd0e.jpg"
          width={150}
          height={150}
          stories={[]}
        />
      </div>

      <div className="profile-detail--right">
        <div className="action">
          <Text className="username">KhangDT</Text>
          {renderAction()}
        </div>

        <div className="statistic">
          <div className="statistic--group">
            <Text className="number">856</Text>
            <Text className="label">posts</Text>
          </div>

          <div className="statistic--group">
            <Text className="number">100k</Text>
            <Text className="label">followers</Text>
          </div>

          <div className="statistic--group">
            <Text className="number">9</Text>
            <Text className="label">following</Text>
          </div>
        </div>

        <div className="infor">
          <Text className="name">Dam Tuan Khang</Text>
          <Text className="desc">Tặng giày mỗi ngày ♥️</Text>
        </div>
      </div>
    </div>
  );
}

export default Detail;
