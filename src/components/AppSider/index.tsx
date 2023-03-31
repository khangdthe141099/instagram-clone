import { FC, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Image, Layout, Menu } from "antd";
import classNames from "classnames";

import AppLink from "@/components/AppLink";
const { Sider: SiderAntd } = Layout;
import { getMenuSider } from "./const";

const Sider: FC = () => {
  const router = useRouter();

  const currentPage = router.pathname?.split("/")[1];
  const [selectedKey, setSelectedKey] = useState<any>("");
  const [collapsed, setCollapsed] = useState(false);
  const handleToggleCollapse = () => setCollapsed(!collapsed);

  const handleSelected = (value: { key: string }) => {
    setSelectedKey(value.key);
    localStorage.setItem("selected", value.key);
  };

  useEffect(() => {
    setSelectedKey(localStorage.getItem("selected"));
  }, []);

  const menuSider = useMemo(() => getMenuSider(selectedKey), [selectedKey]);

  return (
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
        items={menuSider}
        onClick={handleSelected}
      />
    </SiderAntd>
  );
};

export default Sider;
