import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.project.findMany({
      include: {
        projectImages: true,
        technologies: true,
      },
    });

    return res.status(200).json({ projects: data });
  } catch (error) {
    res.json(error);
  }
}
