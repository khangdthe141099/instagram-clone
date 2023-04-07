import connectMongo from "@/database/conn";
import Users from "@/model/users";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHOD } from "@/constant";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  const { userId } = req.query 

  if (req.method === HTTP_METHOD.GET) {
    Users.findOne({ email: userId })
    .then(data => res.status(200).json({ user: data }))
    .catch()
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only GET Accepted" });
  }
}
