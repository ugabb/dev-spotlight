import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
import { useId } from "react";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { projectId, userId } = req.body;
    console.log(projectId, userId);

    // Verify if the project exists
    const project = await prisma.project.findFirst({
      where: {
        id: projectId as string,
      },
    });

    if (!project) {
      return res.status(404).json("Project not Found!");
    }

    // Check if the user already saved as favorite this project
    const currentUserAlreadySaved = await prisma.user.findFirst({
      where: {
        id: userId,
        favoritesProjects: {
          some: {
            project: {
              id: projectId as string,
            },
          },
        },
      },
    });

    if (currentUserAlreadySaved) {
      console.log("Already saved");
      // If already saved, remove from the list of favorite projects
      const removeAsFavorite = await prisma.favoriteProject.deleteMany({
        where: {
          projectId,
          authorId: project.userId,
        },
      });
      return res
        .status(200)
        .json({ message: "Project Removed from favorites" });
    } else {
      // If not saved, save it to the list of favorite projects
      const saveProjectAsFavorite = await prisma.favoriteProject.create({
        data: {
          project: {
            connect: {
              id: projectId,
            },
          },
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return res
        .status(200)
        .json({ message: "Project Saved", project: saveProjectAsFavorite });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
