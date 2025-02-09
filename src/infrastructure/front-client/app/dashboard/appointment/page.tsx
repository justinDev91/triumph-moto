import getUserAppointments from "@/hooks/user/getUserAppointments";
import CardAppointment from "@/components/CardAppointment";
import Link from "next/link";

export default async function AppointmentPage() {
  const appointments = await getUserAppointments();

  return (
    <div className="flex-col text-black">
      <Link
        href="/dashboard/appointment/create"
        className="bg-gray-800 text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
      >
        Créer un rendez-vous
      </Link>
      <h1 className="text-3xl font-bold mb-4">Vos rendez-vous</h1>
      {appointments && appointments.length > 0 ? (
        appointments.map((appointment) => (
          <CardAppointment key={appointment.id} appointment={appointment} />
        ))
      ) : (
        <h1 className="text-xl font-semibold">Aucun rendez-vous trouvé</h1>
      )}
    </div>
  );
}
