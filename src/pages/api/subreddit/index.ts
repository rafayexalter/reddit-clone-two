import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getSubs = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subs = await prisma.subreddit.findMany();
    res.json(subs);
  } catch (error) {
    console.log(error);
  }
};

export default getSubs;
