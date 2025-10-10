import axios from "axios";
import Profil from "@/interfaces/user/profil";

export default async function getByEmail(email: string): Promise<
  | Profil
  | {
      name: string;
    }
> {
  const response = await axios.get<Profil>(
    `http://localhost:3000/users/email/${email}`
  );

  return response.data;
}
