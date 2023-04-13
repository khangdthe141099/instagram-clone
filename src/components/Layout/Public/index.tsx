import type { PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { Layout as LayoutContainer } from "antd";
import classNames from "classnames";
import type { NextPageWithLayout } from "@/pages/_app";
import AppSeo from "@/components/AppSeo";
import Sider from "@/components/AppSider";
import { UpCircleOutlined } from '@ant-design/icons'; 
import { smoothScrollToTop } from '@/utils'

const AppLayout: NextPageWithLayout<
  PropsWithChildren<{
    title?: string;
    className?: string;
    notShowFooter?: boolean;
    notShowHeader?: boolean;
    socialImageUrl?: string;
    metaDescription?: string;
    faviconImageUrl?: string;
  }>
> = ({
  children,
  className,
  title = "",
  notShowFooter,
  notShowHeader,
  socialImageUrl,
  faviconImageUrl,
  metaDescription,
}) => {
  const [showGoToTop, setShowGoToTop] = useState(false);

  //Display button "Go To Top" when scroll down 200px:
  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <AppSeo
        title={title}
        socialImageUrl={socialImageUrl}
        faviconImageUrl={faviconImageUrl}
        metaDescription={metaDescription}
      />
      <LayoutContainer className={classNames("layout-container", className)}>
        <Sider />
        {children}
        {showGoToTop && <UpCircleOutlined onClick={smoothScrollToTop} className="go-to-top"/>}
      </LayoutContainer>
    </>
  );
};

export default AppLayout;
