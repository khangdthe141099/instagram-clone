import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Public";
import Detail from "@/components/Pages/Profile/Detail";
import Gallery from "@/components/Pages/Profile/Gallery";
import HomeReels from "@/components/Pages/Home/HomeMain/HomeReels";
import { useAllPostAction } from "@/store/post/selector";
import { useGetCurrentPost } from "../login/hooks";

const Profile: NextPageWithLayout = () => {

  return (
    <div className="profile">
      <Detail />
      <div className="profile-reels">
        <HomeReels
          circleWidth={87}
          circleHeight={87}
          arrowToLeft={0}
          arrowToTop={38}
        />
      </div>
      <Gallery />
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
