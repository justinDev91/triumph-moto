import AppointmentForm from "@/components/AppointmentForm";

export default function AppointmentCreatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Créer un rendez-vous</h1>
        <AppointmentForm />
      </div>
    </div>
  );
}
