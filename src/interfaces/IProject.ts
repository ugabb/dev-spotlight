import { Project, User } from "@prisma/client";
import { IUser } from "./IUser";

export interface IProjectToCreate {
  id?: string;
  name: string;
  linkRepo: string;
  description: string;
  deployedLink: string;
  technologies: ITechnologies[];
  projectImages?: IProjectImages[];
  likes: number;
  userId: string;
}

export interface IProject {
  id: string;
  name: string;
  linkRepo: string;
  description: string;
  deployedLink: string;
  technologies: ITechnologies[];
  projectImages?: IProjectImages[];
  likes: number;
  userId: string;
  user: IUser;
}
export interface ITechnologies {
  id?: string;
  name: string;
  // color: string;
}
export interface IProjectImages {
  id?:string;
  url: string;
}
