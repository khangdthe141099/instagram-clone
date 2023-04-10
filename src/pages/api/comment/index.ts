import connectMongo from "@/database/conn";
import Comments from "@/model/comments";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHOD } from "@/constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  // only [POST] method is accepted:
  if (req.method === HTTP_METHOD.POST) {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data...!" });

    const { _id, userId, postId, content, likes, replies } = req.body;

    //check duplicates user:
    const checkExisting = await Comments.findOne({ _id });
    if (checkExisting)
      return res.status(422).json({ message: "User already exist...!" });

    //hash passwords:
    Comments.create({ userId, postId, content, likes, replies })
      .then((data) => res.status(200).json({ status: true, comment: data }))
      .catch((error) => res.status(404).json({ error: error }));
  } else if (req.method === HTTP_METHOD.GET) {
    Comments.find()
      .then((data) => res.status(200).json({ comment: data }))
      .catch();
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}
