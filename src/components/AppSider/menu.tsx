import Link from "next/link";
import { Image, Avatar } from "antd";
import { ROUTES } from "@/constant/routes";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { useModal } from "@/hooks/useModal";

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
  profileImg: string,
  onOpenCreatePost: any
) => {
  const renderIcon = (item: any) => {
    const { key } = item;

    if (key === "profile") {
      return (
        <Avatar
          src={profileImg ? profileImg : "/images/user/no_avatar.png"}
          icon={!profileImg ? <UserOutlined /> : false}
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
      return <div onClick={() => signOut()}>{item.label}</div>;
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
