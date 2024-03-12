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
      return res.status(400).json("Already liked");
    }

    // Add the current project to the list of projects liked by the current user
    const projectLiked = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        likes: {
          increment: 1,
        },
        ProjectsLiked: {
          create: {
            user: {
              connect: {
                username,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(projectLiked);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
