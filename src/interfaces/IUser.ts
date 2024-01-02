export interface IUser {
  id?: number;
  name: string
  username: string
  email: string
  githubProfileLink: string
  githubProfilePhoto: string
  followers: number
  favoritesRepositories: IFavoriteRepository[]
  role: string
}


interface IFavoriteRepository {
  name: string;
  link: string;
  author: string;
}