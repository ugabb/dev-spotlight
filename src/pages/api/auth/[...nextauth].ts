import { ProfileContext } from "@/context/ProfileContext"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { useContext } from "react"



const { profile, updateProfile  } = useContext(ProfileContext)

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile, token) {
        console.log(profile)
        console.log(token)
        updateProfile(profile)
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          provider: "github"
        };
      },
    }),
    // ...add more providers here
  ],
  
}

export default NextAuth(authOptions)