import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function REMOVE(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { projectId } = req.query;
    console.log(projectId);
    
    const exitingProject = await prisma.project.findUnique({
      where: {
        id: projectId as string,
      },
    });
    
    if (!exitingProject) {
      console.log("Does not exist this project",projectId);
      return res.status(404).json({ message: "Project not found" });
    }

    await prisma.favoriteProject.deleteMany({
      where: {
        projectId: projectId as string,
      },
    });
    await prisma.projectsLiked.deleteMany({
      where: {
        projectId: projectId as string,
      },
    });

    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId as string,
      },
    });
    console.log("Project deleted",deletedProject);

    return res.status(200).json({ message: "Project deleted", deletedProject });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
}