import connectMongo from "@/database/conn";
import Posts from "@/model/posts";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHOD } from "@/constant";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  const { userId } = req.query 

  if (req.method === HTTP_METHOD.GET) {
    Posts.findOne({ userId })
    .then(data => res.status(200).json({ post: data }))
    .catch()
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only GET Accepted" });
  }
}
