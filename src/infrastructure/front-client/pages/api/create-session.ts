/* eslint-disable @typescript-eslint/no-explicit-any */
import { withSession } from "@/middleware/sessionMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
import Profil from "@/interfaces/user/profil";

async function createSessionHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const user: Profil = req.body;

    req.session.user = user;
    await new Promise((resolve, reject) => {
      req.session.save((err: any) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
    return res.status(200).json(user);
  } else {
    res.status(405).json({ name: "Méthode non autorisée" });
  }
}

export default withSession(createSessionHandler);
