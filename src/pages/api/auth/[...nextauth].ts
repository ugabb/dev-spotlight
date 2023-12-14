import { ProfileContext } from "@/context/ProfileContext"
import NextAuth, { Awaitable, Session, User } from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import { useContext } from "react"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        console.log("profile: ", profile)
        // console.log(token)
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          uid: profile.id
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log(profile?.login)
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
        token.username = profile.login
        token.name = profile.name
        token.email = profile.email
        token.githubProfileLink = profile.html_url
        token.githubProfilePhoto = profile.avatar_url
      }
      console.log("PRORORORR", profile)
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log(token)
      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user.username = token.username
      session.user.name = token.name
      session.user.email = token.email
      session.user.githubProfileLink = token.githubProfileLink
      session.user.githubProfilePhoto = token.githubProfilePhoto


      return session
    }
  },
}

export default NextAuth(authOptions)

   
// @NotBlank
// private String name;
// @NotBlank
// private String username;
// @Email
// private String email;
// @NotBlank
// private String githubProfileLink;
// private String githubProfilePhoto;
// private List<Followers> followers;
// private List<FavRepositories> favoritesRepositories;
// private Role role;

