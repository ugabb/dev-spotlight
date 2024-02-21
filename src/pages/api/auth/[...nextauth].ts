import { IUser } from "@/interfaces/IUser";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import prisma from "@/lib/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/sign-up",
  // },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email }) {
      console.log("Sign In Callback:", user, account, profile, email);
      const {
        name,
        login,
        email: profileEmail,
        avatar_url,
        html_url,
        followers,
      } = profile;

      const existingUser = await prisma.user.findUnique({
        where: {
          email: profileEmail,
        },
      });

      if (existingUser) {
        // If the user exists, update their profile information
        await prisma.user.update({
          where: { email: profileEmail },
          data: {
            name: name,
            image: avatar_url,
            followers,
            username: login,
            email: profileEmail,
            githubProfileLink: html_url,
          },
        });
      } else {
        // If the user does not exist, create a new user in your database
        const newUser = await prisma.user.create({
          data: {
            name: name,
            image: avatar_url,
            followers,
            username: login,
            email: profileEmail,
            githubProfileLink: html_url,
          },
        });

        await prisma.account.create({
          data: {
            userId: newUser.id,
            type: account.provider,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            token_type: account.token_type,
            scope: account.scope
          },
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log(token, account, profile);
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
        token.username = profile.login;
        token.name = profile.name;
        token.email = profile.email;
        token.githubProfileLink = profile.html_url;
        token.githubProfilePhoto = profile.avatar_url;
        token.followers = profile.followers;
      }
      // console.log("PRORORORR", profile)
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log(token)
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.githubProfileLink = token.githubProfileLink;
      session.user.githubProfilePhoto = token.githubProfilePhoto;
      session.user.followers = token.followers;

      console.log(session);

      return session;
    },

    redirect({ url, baseUrl }) {
      return baseUrl + "/projects";
    },
  },
};

//@ts-ignore
export default NextAuth(authOptions);
