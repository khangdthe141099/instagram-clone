import Avatar from "@/components/Avatar";
import React, { useState } from "react";
import { Typography } from "antd";
import NormalButton from "@/components/AppButton/NormalButton";
import Image from "next/image";
import { FOLLOW_TYPE } from "@/constant";
import Loading from "@/components/Loading";

interface IFollow {
  user?: any;
}

function Follow(props: IFollow) {
  const { user } = props; //User của bài Post hiện tại
  const { is_private } = user;

  console.log("hehe", user);

  const [followType, setFollowType] = useState(FOLLOW_TYPE.FOLLOW);
  const [loading, setLoading] = useState(false);

  const handleFollow = (type: string) => {
    if (type === FOLLOW_TYPE.FOLLOW) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        is_private
          ? setFollowType(FOLLOW_TYPE.REQUESTED)
          : setFollowType(FOLLOW_TYPE.FOLLOWING);
      }, 1000);
    }

    if (type === FOLLOW_TYPE.FOLLOWING) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        setFollowType(FOLLOW_TYPE.FOLLOW);
      }, 1000);
    }

    if (type === FOLLOW_TYPE.REQUESTED) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        setFollowType(FOLLOW_TYPE.FOLLOW);
      }, 1000);
    }
  };

  const renderFollow = (followType: string) => {
    switch (followType) {
      case FOLLOW_TYPE.FOLLOW:
        return (
          <div onClick={() => handleFollow(FOLLOW_TYPE.FOLLOW)}>
            <NormalButton
              width={82}
              height={32}
              text={loading ? <Loading /> : "Follow"}
              color="#0095F6"
              textColor="#FFFFFF"
            />
          </div>
        );

      case FOLLOW_TYPE.FOLLOWING:
        return (
          <div onClick={() => handleFollow(FOLLOW_TYPE.FOLLOWING)}>
            <NormalButton
              width={118}
              height={32}
              text={loading ? <Loading /> : "Following"}
              suffix={true}
              srcIcon="/svg/components/post/ArrowBtn.svg"
            />
          </div>
        );

      case FOLLOW_TYPE.REQUESTED:
        return (
          <div onClick={() => handleFollow(FOLLOW_TYPE.FOLLOWING)}>
            <NormalButton
              width={118}
              height={32}
              text={loading ? <Loading /> : "Requested"}
            />
          </div>
        );

      default:
        break;
    }
  };
  return <>{renderFollow(followType)}</>;
}

export default Follow;
