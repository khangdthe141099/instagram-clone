import Avatar from "@/components/Avatar";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import NormalButton from "@/components/AppButton/NormalButton";
import Image from "next/image";
import { useUserDetail } from "@/store/user/selector";
import { FOLLOW_TYPE } from "@/constant";
import Loading from "@/components/Loading";
import { userService } from "@/services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IFollow {
  user?: any;
}

function Follow(props: IFollow) {
  const { user } = props; //User của bài Post hiện tại
  const crrUser = useUserDetail();
  const { is_private } = user;

  console.log("user", user);

  console.log("hehe", crrUser);

  const [followType, setFollowType] = useState(FOLLOW_TYPE.FOLLOW);
  const [loading, setLoading] = useState(false);

  //Set type of button:
  useEffect(() => {
    const listFollower = user?.follower;

    const findFollow = listFollower?.find((item: any) => {
      return item.email === crrUser.email;
    });

    console.log("findFollow", findFollow);

    if (!findFollow) {
      setFollowType(FOLLOW_TYPE.FOLLOW);
    } else {
      setFollowType(findFollow.type);
    }
  }, [crrUser, user]);

  //Xử lí việc hủy following:
  const cancelFollowing = async () => {
    try {
      setLoading(true);

      if (crrUser) {
        userService
          .cancelFollowing(crrUser?._id, {
            following: {
              email: user?.email,
            },
          })
          .then((res: any) => {
            setFollowType(FOLLOW_TYPE.FOLLOW);
            toast(`You are unfollow ${user?.email}`);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("err", err);
          });
      }

      if (user) {
        userService
          .cancelFollower(user?._id, {
            follower: {
              email: crrUser?.email,
            },
          })
          .then((res: any) => {
            console.log("res", res);
          })
          .catch((err) => {
            setLoading(false);
            console.log("err", err);
          });
      }
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  //Xử lí chuyển trạng thái follow:
  const handleUpdateFollow = async (type: string) => {
    const checked = type === "private";

    try {
      setLoading(true);

      if (crrUser) {
        userService
          .updateFollowing(crrUser?._id, {
            following: {
              email: user?.email,
              type: checked ? FOLLOW_TYPE.REQUESTED : FOLLOW_TYPE.FOLLOWING,
            },
          })
          .then((res: any) => {
            checked
              ? setFollowType(FOLLOW_TYPE.REQUESTED)
              : setFollowType(FOLLOW_TYPE.FOLLOWING);

            checked
              ? toast(`You are requested follow to ${user?.email}`)
              : toast(`You are following to ${user?.email}`);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("err", err);
          });
      }

      if (user) {
        userService
          .updateFollower(user?._id, {
            follower: {
              email: crrUser?.email,
              type: checked ? FOLLOW_TYPE.REQUESTED : FOLLOW_TYPE.FOLLOWING,
            },
          })
          .then((res: any) => {
            console.log("res", res);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  const handleFollow = (type: string) => {
    //Nếu type === follow => chưa từng follow account này =>
    //check nêu acc này private => chuyển thành requested để yêu cầu follow
    //check này acc này public => chuyển thành following
    if (type === FOLLOW_TYPE.FOLLOW) {
      if (is_private) {
        handleUpdateFollow("private");
      } else {
        handleUpdateFollow("public");
      }
    }

    //Nếu type === folowing => click sẽ unfollow acc
    if (type === FOLLOW_TYPE.FOLLOWING) {
      cancelFollowing();
    }

    //Nếu type === requested => click sẽ unfollow acc
    if (type === FOLLOW_TYPE.REQUESTED) {
      cancelFollowing();
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

  return (
    <>
      {renderFollow(followType)}
      <ToastContainer />
    </>
  );
}

export default Follow;
