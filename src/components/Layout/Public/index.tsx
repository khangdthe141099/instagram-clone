import type { PropsWithChildren } from "react";

import { Layout as LayoutContainer } from "antd";
import classNames from "classnames";
import type { NextPageWithLayout } from "@/pages/_app";
import AppSeo from "@/components/AppSeo";
import Sider from "@/components/AppSider";

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
      </LayoutContainer>
    </>
  );
};

export default AppLayout;
