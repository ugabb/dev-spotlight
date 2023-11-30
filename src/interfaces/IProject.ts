export interface IProject {
    id: number
    name: string
    description: string
    linkRepo: string
    technologies: Technology[]
    likes: number
    userId: number
}
export interface Technology {
    name: string
    icon: string
    repository_id: any
}