import Profil from "@/interfaces/user/profil";

export default async function createSessionUser(profil: Profil) {
  const response = await fetch("/api/create-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profil),
  });
  console.log(response.json());
  return response;
}
