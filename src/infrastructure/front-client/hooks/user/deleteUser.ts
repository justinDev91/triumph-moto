import axios from 'axios';

export default async function deleteUser(id: string): Promise<number> {
  const response = await axios.delete(`http://localhost:3000/users/${id}`);

  return response.status;
}
