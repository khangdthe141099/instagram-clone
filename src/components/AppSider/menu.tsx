import Link from "next/link";
import { Image, Avatar } from "antd";
import { ROUTES } from "@/constant/routes";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import usePostStore from "@/store/post/usePostStore";
import useUserStore from "@/store/user/useUserStore";

const avatarStyle = {
  width: "26px",
  height: "26px",
  marginLeft: "-2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const getMenuSider = (
  selectedKey: any,
  user: any,
  onOpenCreatePost: any
) => {
  const postStore = usePostStore as any;
  const userStore = useUserStore as any;

  const handleLogout = () => {
    signOut();
    postStore.persist.clearStorage();
    userStore.persist.clearStorage();
  };

  const renderIcon = (item: any) => {
    const { key } = item;

    if (key === "profile") {
      return (
        <Avatar
          src={
            user?.profileImg ? user?.profileImg : "/images/user/no_avatar.png"
          }
          icon={!user?.profileImg ? <UserOutlined /> : false}
          alt={item.key}
          style={avatarStyle}
        />
      );
    } else if (key === "logout") {
      return <PoweroffOutlined style={{ fontSize: "23px" }} />;
    } else {
      return (
        <Image
          src={selectedKey === item.key ? item.activeIcon : item.icon}
          alt={item.key}
          preview={false}
        />
      );
    }
  };

  const renderLabel = (item: any) => {
    const { key } = item;

    if (key === "logout") {
      return <div onClick={handleLogout}>{item.label}</div>;
    } else if (key === "create") {
      return (
        <div
          style={
            selectedKey === item.key
              ? { fontWeight: "700" }
              : { fontWeight: "400" }
          }
          onClick={() => onOpenCreatePost()}
        >
          {item.label}
        </div>
      );
    } else if (key === "profile") {
      return (
        <Link
          style={
            selectedKey === item.key
              ? { fontWeight: "700" }
              : { fontWeight: "400" }
          }
          href={`/profile/${user?.email}`}
        >
          {item.label}
        </Link>
      );
    } else {
      return (
        <Link
          style={
            selectedKey === item.key
              ? { fontWeight: "700" }
              : { fontWeight: "400" }
          }
          href={item.link}
        >
          {item.label}
        </Link>
      );
    }
  };

  return ROUTES.map((item, index) => ({
    key: item.key,
    icon: renderIcon(item),
    label: renderLabel(item),
  }));
};
