import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { projectId } = req.query;

    const project = await prisma.project.update({
      where: {
        id: projectId as string,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    if (!project) return res.status(404).json("Project not Found!");

    return res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
}
