import { Project, ProjectsLiked, User } from "@prisma/client";
import axios from "axios";
import { create } from "zustand";

interface IUserStore {
  currentUser: User;
  projects: Project[];
  ProjectsLiked: ProjectsLiked[];
}

interface ICurrentUserStore {
  currentUser: IUserStore | undefined;
  setCurrentUser: (username: string) => void;
}

const userStore = create<ICurrentUserStore>()((set) => ({
  currentUser: undefined,
  setCurrentUser: async (username: string) => {
    try {
      const { data } = await axios.get(`/api/users/username/${username}`);
      console.log(data);
      set({
        currentUser: data as IUserStore,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default userStore;
