import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";
import Layout from "@/components/Layout/Public";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Edit from "@/components/Pages/Profile/Edit";

const EditProfile: NextPageWithLayout = () => {
  return (
    <div className="editprofile">
      <Head>
        <title>Edit profile</title>
      </Head>
      <Edit />
    </div>
  );
};

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditProfile;

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
