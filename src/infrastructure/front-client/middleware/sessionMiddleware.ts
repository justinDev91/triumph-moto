/* eslint-disable @typescript-eslint/no-explicit-any */
import session from "express-session";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  },
});

export function withSession(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await new Promise((resolve, reject) => {
      sessionMiddleware(req as any, res as any, (err: any) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
    return handler(req, res);
  };
}
