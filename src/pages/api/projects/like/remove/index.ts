import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { projectId, username } = req.body;

    // Verify if the project exists
    const project = await prisma.project.findFirst({
      where: {
        id: projectId as string,
      },
    });

    if (!project) {
      return res.status(404).json("Project not Found!");
    }

    // Check if the user already liked this project
    const currentUser = await prisma.user.findFirst({
      where: {
        username,
        ProjectsLiked: {
          some: {
            project: {
              id: projectId as string,
            },
          },
        },
      },
    });

    if (!currentUser) {
      return res.status(400).json("User didn't like");
    }

    // Remove the project from the ProjectsLiked table
    await prisma.projectsLiked.deleteMany({
      where: {
        projectId: project.id,
        userId: currentUser.id,
      },
    });

    // Save the updated project
    console.log(project.likes);
    const updatedProject = await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        likes: {
          decrement: 1,
        },
      },
    });

    return res.status(200).json(updatedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
