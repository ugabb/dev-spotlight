import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const username = req.query.username as string;
    
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        projects: true,
        ProjectsLiked: true,
        favoritesProjects: true,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log("GET_USER_BY_USERNAME", error);
    return res.status(404).json({ message: "User not Found", error });
  }
}
