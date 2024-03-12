import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, projectName } = req.query;

    const project = await prisma.project.findFirst({
      where: {
        user: {
          username: username as string,
        },
        name: projectName as string,
      },
      include: {
        user: true,
        technologies: true,
        projectImages: true,
        ProjectsLiked: true,
      },
    });
    console.log(project);

    return res.status(200).json(project);
  } catch (error) {
    res.json(error);
  }
}
