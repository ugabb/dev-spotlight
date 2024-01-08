import { IUser } from "./IUser";

export interface IProjectToCreate {
    id?:number;
    name: string;
    linkRepo: string;
    description: string;
    deployedLink: string;
    technologies: ITechnologies[];
    projectImages?: IProjectImages[];
    likes: number;
    userId: number;
}
export interface IProject {
    id?:number;
    name: string;
    linkRepo: string;
    description: string;
    deployedLink: string;
    technologies: ITechnologies[];
    projectImages?: IProjectImages[];
    likes: number;
    user: IUser;
}
export interface ITechnologies {
    name: string;
    // color: string;
}
export interface IProjectImages {
    url: string;
}