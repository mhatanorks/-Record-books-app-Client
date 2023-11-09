import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env.mjs";
import axios from "axios";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ account, user }) {
      if (account) {
        const { access_token, id_token } = account;
        try {
          const res = await axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/social/login/google/`,
              { access_token: access_token, id_token: id_token }
            )
            .then((res) => (account.access_token = res.data.access_token));
          console.log(res);
          return true;
        } catch (error) {
          console.log("失敗");
          console.log(error);
          return false;
        }
      }
      return false;
    },

    async jwt({ token, account }) {
      // console.log(token)
      // console.log(account)
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const { access_token } = account;
        token.access_token = access_token;
      }
      return token;
    },
    session: ({ session, user, token }) => (
      // console.log("session:"),
      // console.log(session),
      // console.log("user"),
      // console.log(user),
      // console.log("token"),
      // console.log(token),
      {
        ...session,
        user: {
          ...session.user,
          token: token.access_token,
        },
      }
    ),
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
