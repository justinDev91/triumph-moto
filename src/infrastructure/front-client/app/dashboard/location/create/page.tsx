import getUser from "@/hooks/user/getUser";
import getMotorcycles from "@/hooks/motorcycles/getMotorcycles";
import { redirect } from "next/navigation";
import Motorcycle from "@/interfaces/motorcycle/motorcycle";
import LocationForm from "@/components/LocationForm";

export default async function LocationCreatePage() {
  const userData = await getUser();
  const motorcyclesData = await getMotorcycles();

  if (!userData) {
    redirect("/Sign/In");
  }

  const availableMotorcycles: Motorcycle[] = motorcyclesData.filter(
    (moto: Motorcycle) => moto.status === "Available"
  );
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Louer une moto</h1>
        <LocationForm availableMotorcycles={availableMotorcycles} />
      </div>
    </div>
  );
}
