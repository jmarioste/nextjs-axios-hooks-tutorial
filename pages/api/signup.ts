// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sleep(1000);
  res.status(200).json({ success: true });
}
