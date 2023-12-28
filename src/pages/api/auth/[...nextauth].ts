import { ProfileContext } from "@/context/ProfileContext"
import { IUser } from "@/interfaces/IUser"
import NextAuth, { Awaitable, Session, User } from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import { useContext } from "react"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
        token.username = profile.login
        token.name = profile.name
        token.email = profile.email
        token.githubProfileLink = profile.html_url
        token.githubProfilePhoto = profile.avatar_url
        token.followers = profile.followers
      }
      // console.log("PRORORORR", profile)
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log(token)
      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user.username = token.username
      session.user.name = token.name
      session.user.email = token.email
      session.user.githubProfileLink = token.githubProfileLink
      session.user.githubProfilePhoto = token.githubProfilePhoto
      session.user. followers = token.followers

      const user: IUser = {
        email: session.user.email,
        name: session.user.name,
        username: session.user.username,
        githubProfileLink: session.user.githubProfileLink,
        githubProfilePhoto: session.user.githubProfilePhoto,
        followers: session.user.followers,
        favoritesRepositories: [],
        role: "USER"
      }

      try {
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/username/${session.user.username}`)
        if (!userResponse.ok) {
          throw new Error('User not found');
        }
      } catch (error) {
        console.log("User already exist!",error)
        try {
          // Create a new user in the database
          const createUserResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });
    
          if (!createUserResponse.ok) {
            throw new Error('Failed to create user');
          }
    
          console.log("New user created successfully");
        } catch (error) {
          console.error("Failed to create user:", error.message);
        }

        
      }

      return session
    }
  },
}


export default NextAuth(authOptions)
