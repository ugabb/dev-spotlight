import NextAuth, { DefaultSession } from "next-auth"
import { GithubProfile } from "next-auth/providers/github"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            username: string,
            name: string,
            email: string,
            image: string,
            id: string,
            githubProfileLink: string,
            githubProfilePhoto: string
        }
    }
    interface User {
        /** The user's postal address. */
        username: string,
        name: string,
        email: string,
        image: string,
        id: string,
        githubProfileLink: string,
        githubProfilePhoto: string
    }
}