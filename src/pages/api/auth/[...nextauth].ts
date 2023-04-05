import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/users";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID
        ? process.env.NEXT_PUBLIC_GOOGLE_ID
        : "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
        ? process.env.NEXT_PUBLIC_GOOGLE_SECRET
        : "",
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID
        ? process.env.NEXT_PUBLIC_GITHUB_ID
        : "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
        ? process.env.NEXT_PUBLIC_GITHUB_SECRET
        : "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ? process.env.FACEBOOK_ID : "",
      clientSecret: process.env.FACEBOOK_SECRET
        ? process.env.FACEBOOK_SECRET
        : "",
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed...!";
        });

        //check user existance:
        const result = await Users.findOne({ email: credentials?.email });
        if (!result) {
          throw new Error("No user found with email, please sign up...!");
        }

        //compare()
        if (credentials) {
          const checkPassword = await compare(
            credentials.password,
            result.password
          );

          //incorrect password:
          if (!checkPassword) {
            throw new Error("Username and password mismatch...!");
          }
        }

        return result;
      },
      credentials: {} as any,
    }),
  ],
  secret: "XqTFzGeaxg7EDQDp51leF2PLZ6WhHttECjSZXebX40M=",
});
