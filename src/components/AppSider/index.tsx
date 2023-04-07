/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Image, Layout, Menu } from "antd";
import classNames from "classnames";

import AppLink from "@/components/AppLink";
const { Sider: SiderAntd } = Layout;
import { getMenuSider } from "./menu";
import { useUserDetail } from "@/store/user/selector";
import CreatePost from "@/components/Pages/Home/Modal/CreatePost";
import { useModal } from "@/hooks/useModal";

const Sider: FC = () => {
  const router = useRouter();

  const {
    open: openCreatePost,
    onOpenModal: onOpenCreatePost,
    onCloseModal: onCloseCreatePost,
  } = useModal();

  const currentPage = router.pathname?.split("/")[1];
  const [selectedKey, setSelectedKey] = useState<any>("");
  const [collapsed, setCollapsed] = useState(false);
  const handleToggleCollapse = () => setCollapsed(!collapsed);
  const [menu, setMenu] = useState<any[]>([]);

  const user = useUserDetail() as any;

  const handleSelected = (value: { key: string }) => {
    setSelectedKey(value.key);
    localStorage.setItem("selected", value.key);
  };

  useEffect(() => {
    setSelectedKey(localStorage.getItem("selected"));
  }, []);

  useEffect(() => {
    const menu = getMenuSider(selectedKey, user?.profileImg, onOpenCreatePost);

    if (user) {
      setMenu(menu as any);
    }
  }, [selectedKey, user]);

  return (
    <>
      <SiderAntd
        className="app-sider"
        width={244}
        collapsed={collapsed}
        defaultCollapsed={false}
      >
        <div className={classNames("app-sider__top")}>
          <AppLink href="/">
            <Image
              src={
                collapsed
                  ? "/svg/components/sider/InstagramLogo.svg"
                  : "/svg/components/sider/InstagramText.svg"
              }
              alt=""
              width={collapsed ? 44 : 103}
              height={29}
              preview={false}
            />
          </AppLink>
        </div>

        <Menu
          className="app-sider__menu"
          mode="inline"
          selectedKeys={[currentPage === "" ? "home" : currentPage]}
          items={menu}
          onClick={handleSelected}
        />
      </SiderAntd>
      <CreatePost isModalOpen={openCreatePost} onCloseCreatePost={onCloseCreatePost}/>
    </>
  );
};

export default Sider;
