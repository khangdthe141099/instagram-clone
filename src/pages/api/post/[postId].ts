import connectMongo from "@/database/conn";
import Posts from "@/model/posts";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHOD } from "@/constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  const { postId } = req.query;

  if (req.method === HTTP_METHOD.GET) {
    Posts.findOne({ _id: postId })
      .then((data) => res.status(200).json({ post: data }))
      .catch();
  } else if (req.method === HTTP_METHOD.DELETE) {
    Posts.findByIdAndDelete({ _id: postId })
      .then((data) => res.status(200).json({ post: data }))
      .catch();
  } else if (req.method === HTTP_METHOD.PATCH) {
    Posts.findByIdAndUpdate({ _id: postId }, req.body, {
      new: true,
    })
      .then((data) => res.status(200).json({ post: data }))
      .catch((err) => console.log("loi:>", err));
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only GET Accepted" });
  }
}
