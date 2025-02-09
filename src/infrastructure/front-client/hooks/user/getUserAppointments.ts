import axios from "axios";
import { getSession } from "@/lib/session";
import Appointment from "@/interfaces/appointment/appointment";

export default async function getUserAppointments(): Promise<
  Appointment[] | null
> {
  try {
    const sessionUser = await getSession();
    if (!sessionUser) return null;

    const response = await axios.get("http://localhost:3000/appointments");

    const userAppointments = response.data.filter(
      (appointment: Appointment) =>
        appointment.user.id === sessionUser.sessionUser.id
    );

    return userAppointments;
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous :", error);
    return null;
  }
}
