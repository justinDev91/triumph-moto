import axios from "axios";
import Profil from "@/interfaces/user/profil";
import { getSession } from "@/lib/session";

export default async function getUser(): Promise<Profil | null> {
  try {
    const sessionUser = await getSession();
    if (!sessionUser) {
      return null;
    }

    const response = await axios.get<Profil>(
      `http://localhost:3000/users/${sessionUser.sessionUser.id}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      return null;
    }
    throw error;
  }
}
