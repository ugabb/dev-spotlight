export interface IUser {
  id: string;
  name: string;
  email: string;
  followers: number;
  githubProfileLink: string;
  githubProfilePhoto: string | null;
  image: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}


interface IFavoriteRepository {
  name: string;
  link: string;
  author: string;
}