import getUser from "@/hooks/user/getUser";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilPage() {
  const userData = await getUser();
  if (!userData) {
    redirect("/Sign/In");
  }

  return (
    <div className="flex min-h-screen text-black">
      <aside className="w-64 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Bienvenue {userData.firstname} {userData.lastname}
        </h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="hover:underline">
              Settings
            </a>
          </li>
          <li className="mb-2">
            <LogoutButton />
          </li>
        </ul>
      </aside>
      <main className="flex-1 bg-gradient-to-b from-white to-[#333] p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          {/* TODO : Ajoutez d'autres informations de profil ici */}
        </div>
      </main>
    </div>
  );
}
