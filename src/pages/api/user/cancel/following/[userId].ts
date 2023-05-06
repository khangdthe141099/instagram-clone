import connectMongo from "@/database/conn";
import Users from "@/model/users";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHOD } from "@/constant";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  const { userId }: any = req.query;

  if (req.method === HTTP_METHOD.PATCH) {
    Users.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: req.body,
      },
      {
        new: true,
      }
    )
      .sort({ createdAt: -1 })
      .then((data) => res.status(200).json({ user: data }))
      .catch((err) => console.log("loi:>", err));
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only GET Accepted" });
  }
}
