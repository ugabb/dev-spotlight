import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function GET(req: NextRequest, res: NextResponse) {
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
