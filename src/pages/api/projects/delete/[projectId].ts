import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function REMOVE(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { projectId } = req.query;
    const exitingProject = await prisma.project.findUnique({
      where: {
        id: projectId as string,
      },
    });

    if (!exitingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId as string,
      },
    });

    return res.status(200).json({ message: "Project deleted", deletedProject });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
