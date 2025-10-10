import comparePassword from "@/hooks/user/comparePassword";
import getByEmail from "@/hooks/user/getByEmail";
import Profil from "@/interfaces/user/profil";

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
      return searchResponse;
    }
    return { name: "Le mot de passe n'est pas correcte" };
  }

  return searchResponse;
}
