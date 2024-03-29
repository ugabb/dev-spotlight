import NextAuth, { DefaultSession } from "next-auth";
import { GithubProfile } from "next-auth/providers/github";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface JWT {
    accessToken: string;
    id: string;
    username: string;
    name: string;
    email: string;
    githubProfileLink: string;
    githubProfilePhoto: string;
    followers: number;
  }
  interface Session {
    user: {
      /** The user's postal address. */
      username: string;
      name: string;
      email: string;
      image: string;
      id: string;
      githubProfileLink: string;
      githubProfilePhoto: string;
      userId: string;
      accessToken: string;
    };
  }
  interface User {
    /** The user's postal address. */
    username: string;
    name: string;
    email: string;
    image: string;
    id: string;
    githubProfileLink: string;
    githubProfilePhoto: string;
    userId: string;
  }
  interface Profile {
    id: string;
    login: string;
    name: string;
    email: string;
    avatar_url: string;
    githubProfileLink: string;
    html_url: string;
    followers: number;
  }
}
