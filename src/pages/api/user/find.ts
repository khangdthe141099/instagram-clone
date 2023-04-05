import connectMongo from "@/database/conn";
import Users from "@/model/users";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHOD } from "@/constant";

type Data = {
  error?: string;
  message?: string;
  status?: boolean;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === HTTP_METHOD.GET) {
    Users.find()
    .then(data => res.status(200).json({ user: data }))
    .catch()
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only GET Accepted" });
  }
}
