import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

interface IProjectBody {
  name: string;
  linkRepo: string;
  deployedLink: string;
  technologies: { name: string }[];
  description: string;
  projectImages: { url: string }[];
  userId: string;
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projectData = req.body as IProjectBody;
    console.log(projectData);

    const existingProject = await prisma.project.findFirst({
      where: {
        linkRepo: projectData.linkRepo,
      },
    });

    if (existingProject) {
      return res.status(400).json({ message: "Projets already exists.\n The repository link already exist." });
    }

    const projectCreated = await prisma.project.create({
      data: {
        name: projectData.name,
        description: projectData.description,
        deployedLink: projectData.deployedLink,
        linkRepo: projectData.linkRepo,
        likes: 0,
        technologies: {
          create: projectData.technologies,
        },
        projectImages: {
          create: projectData.projectImages,
        },
        userId: projectData.userId,
      },
      include: {
        user: true,
        technologies: true,
        projectImages: true,
      },
    });

    return res.status(201).json(projectCreated);
  } catch (error) {
    console.log("PROJECT_CREATION_ERROR", error);
  }
}
