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

    if (currentUser) {
      console.log("Already liked");
      return res.status(400).json("Already liked");
    }

    // Add the current project to the list of projects liked by the current user
    const projectLiked = await prisma.projectsLiked.create({
      data: {
        project: {
          connect: { id: projectId as string },
        },
        user: {
          connect: { username },
        },
      },
    });

    // increment project likes
    project.likes = project.likes + 1;

    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
