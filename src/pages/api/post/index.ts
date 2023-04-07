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

    //only [POST] method is accepted:
    // if (req.method === HTTP_METHOD.POST) {
    //   if (!req.body)
    //     return res.status(404).json({ error: "Don't have form data...!" });

    //   const { email, fullname, username, password } = req.body;

    //   //check duplicates user:
    //   const checkExisting = await Users.findOne({ email });
    //   if (checkExisting)
    //     return res.status(422).json({ message: "User already exist...!" });

    //   //hash passwords:
    //   Users.create({ email, fullname, username, password: await hash(password, 12) })
    //     .then((data) => res.status(201).json({ status: true, user: data }))
    //     .catch((error) => res.status(404).json({ error }));
    // }  else {
    //     res
    //       .status(500)
    //       .json({ message: "HTTP method not valid only POST Accepted" });
    //   }
}
