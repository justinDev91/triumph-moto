import axios from "axios";
import Profil from "@/interfaces/user/profil";

export default async function getUser(id: string): Promise<Profil> {
  const response = await axios.get<Profil>(`http://localhost:3000/users/${id}`);

  return response.data;
}
