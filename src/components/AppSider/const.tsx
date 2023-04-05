import Link from "next/link";
import { Image } from "antd";
import { ROUTES } from "@/constant/routes";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const {
  HOME,
  CREATE,
  EXPLORE,
  MESSAGES,
  MORE,
  NOTIFICATIONS,
  PROFILE,
  REELS,
  SEARCH,
} = ROUTES;

export const getMenuSider = (selectedKey: any) => {
  return (
    [
        {
          key: HOME.key,
          icon: (
            <Image
              src={
                selectedKey === HOME.key
                  ? "/svg/components/sider/HomeIcon.svg"
                  : "/svg/components/sider/HomeIconActive.svg"
              }
              alt={HOME.key}
              preview={false}
            />
          ),
          label: <Link href={HOME.link}>{HOME.label}</Link>,
        },
        {
          key: SEARCH.key,
          icon: (
            <Image
              src={
                selectedKey === SEARCH.key
                  ? "/svg/components/sider/SearchActive.svg"
                  : "/svg/components/sider/Search.svg"
              }
              alt={SEARCH.key}
              preview={false}
            />
          ),
          label: SEARCH.label,
        },
        {
          key: EXPLORE.key,
          icon: (
            <Image
              src={
                selectedKey === EXPLORE.key
                  ? "/svg/components/sider/ExploreActive.svg"
                  : "/svg/components/sider/Explore.svg"
              }
              alt={EXPLORE.key}
              preview={false}
            />
          ),
          label: <Link href={EXPLORE.link}>{EXPLORE.label}</Link>,
        },
        {
          key: REELS.key,
          icon: (
            <Image
              src={
                selectedKey === REELS.key
                  ? "/svg/components/sider/ReelsActive.svg"
                  : "/svg/components/sider/Reels.svg"
              }
              alt={REELS.key}
              preview={false}
            />
          ),
          label: <Link href={REELS.link}>{REELS.label}</Link>,
        },
        {
          key: MESSAGES.key,
          icon: (
            <Image
              src={
                selectedKey === MESSAGES.key
                  ? "/svg/components/sider/MessengerActive.svg"
                  : "/svg/components/sider/Messenger.svg"
              }
              alt={MESSAGES.key}
              preview={false}
            />
          ),
          label: <Link href={MESSAGES.link}>{MESSAGES.label}</Link>,
        },
        {
          key: NOTIFICATIONS.key,
          icon: (
            <Image
              src={
                selectedKey === NOTIFICATIONS.key
                  ? "/svg/components/sider/NotificationsActive.svg"
                  : "/svg/components/sider/Notifications.svg"
              }
              alt={NOTIFICATIONS.key}
              preview={false}
            />
          ),
          label: NOTIFICATIONS.label,
        },
        {
          key: CREATE.key,
          icon: (
            <Image
              src={
                selectedKey === CREATE.key
                  ? "/svg/components/sider/CreateActive.svg"
                  : "/svg/components/sider/Create.svg"
              }
              alt={CREATE.key}
              preview={false}
            />
          ),
          label: CREATE.label,
        },
        {
          key: PROFILE.key,
          icon: (
            <Image
              src={
                selectedKey === PROFILE.key
                  ? "/svg/components/sider/NotificationsActive.svg"
                  : "/svg/components/sider/Notifications.svg"
              }
              alt={PROFILE.key}
              preview={false}
            />
          ),
          label: <Link href={PROFILE.link}>{PROFILE.label}</Link>,
        },
        {
          key: MORE.key,
          icon: (
            <Image
              src={
                selectedKey === MORE.key
                  ? "/svg/components/sider/MoreActive.svg"
                  : "/svg/components/sider/More.svg"
              }
              alt={MORE.key}
              preview={false}
            />
          ),
          label: <div onClick={() => signOut()}>{MORE.label}</div>,
        },
      ]
  )
};
