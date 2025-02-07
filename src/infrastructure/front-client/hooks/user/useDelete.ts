import axios from 'axios';

export default async function useDelete(id: string): Promise<Number> {
  const response = await axios.delete(`http://localhost:3000/users/${id}`);

  return response.status;
}
