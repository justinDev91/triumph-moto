import axios from "axios";

export default async function activateUser(id: string): Promise<number> {
  const response = await axios.put(
    `http://localhost:3000/users/${id}/activate`
  );

  return response.status;
}
