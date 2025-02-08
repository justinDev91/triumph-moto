import Register from '@/interfaces/user/register';
import Profil from '@/interfaces/user/profil';
import axios from 'axios';

export default async function useRegister({
  email,
  firstName,
  lastName,
  password,
}: Register): Promise<Profil | { name: string }> {
  const response = await axios.post<Profil>('http://localhost:3000/users', {
    email,
    firstName,
    lastName,
    password,
  });
  return response.data;
}
