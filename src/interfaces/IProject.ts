export interface IProject {
    name: string;
    linkRepo: string;
    description: string;
    deployedLink: string;
    technologies: ITechnologies[];
    projectImages?: IProjectImages[];
    likes: number;
    userId: number;
}
export interface ITechnologies {
    name: string;
    // color: string;
}
export interface IProjectImages {
    url: string;
}