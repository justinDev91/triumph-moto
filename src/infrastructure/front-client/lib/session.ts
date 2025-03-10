/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import comparePassword from "@/hooks/user/comparePassword";
import getByEmail from "@/hooks/user/getByEmail";
import Profil from "@/interfaces/user/profil";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export default async function login(formData: FormData): Promise<
  | Profil
  | {
      name: string;
    }
> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const searchResponse = await getByEmail(email);
  if ("email" in searchResponse) {
    const compareResponse = comparePassword(password, searchResponse.password);
    if (compareResponse) {
      const expires = new Date(Date.now() + 10 * 1000);
      const sessionUser = {
        id: searchResponse.id,
        isAdmin: searchResponse.administrator,
      };
      const session = await encrypt({ sessionUser, expires });
      const cookieStore = await cookies();
      cookieStore.set("session", session, { expires, httpOnly: true });
      return searchResponse;
    }
    return { name: "Le mot de passe n'est pas correct" };
  }

  return searchResponse;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const response = NextResponse.next();
  response.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return response;
}
