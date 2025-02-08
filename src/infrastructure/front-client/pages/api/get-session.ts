import { withSession } from "@/middleware/sessionMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
async function getSessionHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.session.user) {
      return res.status(200).json(req.session.user);
    } else {
      return res.status(404).json({ name: "No session found" });
    }
  } else {
    res.status(405).json({ name: "Méthode non autorisée" });
  }
}

export default withSession(getSessionHandler);
