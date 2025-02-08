import axios from 'axios';

export default async function useActivate(id: string): Promise<Number> {
  const response = await axios.put(
    `http://localhost:3000/users/${id}/activate`,
  );

  return response.status;
}
