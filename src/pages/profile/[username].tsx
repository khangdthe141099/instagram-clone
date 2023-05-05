import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Public";
import Detail from "@/components/Pages/Profile/Detail";
import Gallery from "@/components/Pages/Profile/Gallery";
import HomeReels from "@/components/Pages/Home/HomeMain/HomeReels";
import { useAllPostAction } from "@/store/post/selector";
import { useGetCurrentPost, useGetCurrentUser } from "../login/hooks";
import { useUserDetail } from "@/store/user/selector";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Profile: NextPageWithLayout = () => {
  const route = useRouter();
  const { username } = route.query;

  const [owner, setOwner] = useState(true);
  const activeUser = useUserDetail();
  const { isLoading, currentUser: userByEmail } = useGetCurrentUser(username);

  useEffect(() => {
    setOwner(activeUser?.email === username);
  }, [activeUser, username]);

  console.log('username', username)

  return (
    <div className="profile">
      <Detail user={owner ? activeUser : userByEmail} owner={owner} />
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};

