import connectMongo from "@/database/conn";
import Comments from "@/model/comments";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHOD } from "@/constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  const { postId } = req.query;

  if (req.method === HTTP_METHOD.GET) {
    Comments.find({ postId })
      .then((data) => res.status(200).json({ comment: data }))
      .catch();
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only GET Accepted" });
  }
}
