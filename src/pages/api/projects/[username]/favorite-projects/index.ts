import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username } = req.query;

    const favoriteProjects = await prisma.user.findUnique({
      where: {
        username: username as string,
      },
      include: {
        favoritesProjects: true,
      },
    });
    console.log(favoriteProjects);

    const projectPromises = favoriteProjects?.favoritesProjects.map(
      async (project) => {
        return prisma.project.findUnique({
          where: {
            id: project.projectId,
          },
          include: {
            user: true,
            technologies: true,
            projectImages: true,
            ProjectsLiked: true,
          },
        });
      }
    );

    const projectResponse = await Promise.all(projectPromises);

    console.log(projectResponse);

    return res.status(200).json({ favoriteProjects: projectResponse });
  } catch (error) {
    res.json(error);
  }
}
