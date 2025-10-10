import { Session } from "express-session";
import Profil from "./interfaces/user/profil";

declare module "next" {
  interface NextApiRequest {
    session: Session & {
      user: Profil;
    };
  }
}
