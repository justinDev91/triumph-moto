import axios from "axios";

export default async function getAppointments() {
  const response = await axios.get("http://localhost:3000/appointments");
  return response.data;
}


