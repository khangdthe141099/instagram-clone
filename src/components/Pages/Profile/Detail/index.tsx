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
import { useModal } from "@/hooks/useModal";
import OwnSettingModal from "./Modal/OwnSetting";
import ListFollowerModal from "./Modal/ListFollower";
import ListFollowingModal from "./Modal/ListFollowing";

const { Text } = Typography;

interface IDetail {
  owner?: boolean;
  user?: any;
}

function Detail(props: IDetail) {
  const [mounted, setMounted] = useState(false);

  const { owner, user } = props;

  const route = useRouter();

  const {
    open: openOwnSetting,
    onOpenModal: onOpenOwnSetting,
    onCloseModal: onCloseOwnSetting,
  } = useModal();

  const {
    open: openFollower,
    onOpenModal: onOpenFollower,
    onCloseModal: onCloseFollower,
  } = useModal();

  const {
    open: openFollowing,
    onOpenModal: onOpenFollowing,
    onCloseModal: onCloseFollowing,
  } = useModal();

  const handleClickOwnSetting = () => {
    onOpenOwnSetting();
  };

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
          <div onClick={handleClickOwnSetting}>
            <Image
              style={{ marginLeft: 15, cursor: "pointer" }}
              width={24}
              height={24}
              src="/svg/components/post/ProfileOptions.svg"
              alt="profile options"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="action--list-guest">
          <Follow user={user} />

          <div className="btn">
            <NormalButton width={88} height={32} text="Message" />
          </div>
          {/* <Image
            style={{ cursor: "pointer" }}
            width={32}
            height={32}
            src="/svg/MoreOption.svg"
            alt="more options"
          /> */}
        </div>
      );
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="profile-detail">
          <div className="profile-detail--left">
            <Avatar
              img={user?.profileImg}
              width={150}
              height={150}
              stories={[]}
            />
          </div>

          <div className="profile-detail--right">
            <div className="action">
              <Text className="username">{user?.username || user?.email}</Text>
              {renderAction()}
            </div>

            <div className="statistic">
              <div className="statistic--group">
                <Text className="number">856</Text>
                <Text className="label">posts</Text>
              </div>

              <div
                onClick={onOpenFollower}
                style={{ cursor: "pointer" }}
                className="statistic--group"
              >
                <Text className="number">100k</Text>
                <Text className="label">followers</Text>
              </div>

              <div
                onClick={onOpenFollowing}
                style={{ cursor: "pointer" }}
                className="statistic--group"
              >
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
      )}
      <OwnSettingModal
        isModalOpen={openOwnSetting}
        onCloseOwnSetting={onCloseOwnSetting}
        user={user}
      />
      <ListFollowerModal
        isModalOpen={openFollower}
        onCloseModal={onCloseFollower}
      />
      <ListFollowingModal
        isModalOpen={openFollowing}
        onCloseModal={onCloseFollowing}
      />
    </>
  );
}

export default Detail;
