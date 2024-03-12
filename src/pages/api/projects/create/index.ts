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

    const existingProject = await prisma.project.findFirst({
      // get the project with userId and name or linkRepo
      where: {
        userId: projectData.userId,
        OR: [{ name: projectData.name }, { linkRepo: projectData.linkRepo }],
      },
    });

    if (
      existingProject?.name === projectData?.name &&
      existingProject?.linkRepo === projectData?.linkRepo
    ) {
      return res.status(500).json({
        message:
          "Projets already exists.\n The repository name and github link already exist.",
      });
    } else if (existingProject?.name === projectData?.name) {
      return res.status(500).json({
        message: "Projets already exists.\n The repository name already exist.",
      });
    } else if (existingProject?.linkRepo === projectData?.linkRepo) {
      return res.status(500).json({
        message: "Projets already exists.\n The repository link already exist.",
      });
    }

    const existingGithubRepositoryLink = await prisma.project.findFirst({
      where: {
        linkRepo: projectData?.linkRepo,
      },
    });

    if (existingGithubRepositoryLink?.linkRepo) {
      return res.status(500).json({
        message:
          "Github Repository Link already exist in another project. Verify if this repository is valid. This repository link could be used by another user",
      });
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
    res.status(500).json(error.message);
  }
}
