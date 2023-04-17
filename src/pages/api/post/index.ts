import connectMongo from "@/database/conn";
import Posts from "@/model/posts";
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

    const { _id, ...rest } = req.body;

    //hash passwords:
    Posts.create({ ...rest })
      .then((data) => res.status(200).json({ status: true, post: data }))
      .catch((error) => {
        return res.status(404).json({ error: error });
      });
  } else if (req.method === HTTP_METHOD.GET) {
    Posts.find()
      .then((data) => res.status(200).json({ post: data, total: data.length }))
      .catch();
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}
