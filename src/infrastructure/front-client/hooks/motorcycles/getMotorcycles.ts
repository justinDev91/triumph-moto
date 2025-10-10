import axios from "axios";

export default async function getMotorcycles() {
  const response = await axios.get("http://localhost:3000/motorcycles");

  return response.data;
}
