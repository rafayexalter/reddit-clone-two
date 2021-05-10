import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const findSub = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subs = await prisma.subreddit.findUnique({
      where: { name: String(req.query.name) },
      include: {
        posts: {
          include: { subreddit: true, user: true },
        },
        joinedUsers: true,
      },
    });
    res.json(subs);
  } catch (error) {
    console.log(error);
  }
};

export default findSub;
