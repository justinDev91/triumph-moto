import React from "react";
import getUser from "@/hooks/user/getUser";
import { redirect } from "next/navigation";
import getUserLocation from "@/hooks/user/getUserLocation";
import Link from "next/link";
import CardLocation from "@/components/CardLocation";

export default async function LocationPage() {
  const userData = await getUser();
  const locationData = await getUserLocation();

  if (!userData) {
    redirect("/Sign/In");
  }

  return (
    <div className="flex-col text-black">
      <Link
        href="/dashboard/location/create"
        className="bg-gray-800 text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
      >
        Louer une moto
      </Link>
      {locationData !== null ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Vos locations</h1>
          {locationData.map((location) => (
            <CardLocation key={location.id} location={location} />
          ))}
        </div>
      ) : (
        <h1 className="text-xl font-semibold mb-4 self-center">
          Vous n&apos;avez pas de location
        </h1>
      )}
    </div>
  );
}
