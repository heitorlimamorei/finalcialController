import { IUser } from '@/types/user';
import axios from 'axios';

const api = 'https://financial-controller-backend.onrender.com';

export function useFetchUserData() {
  async function fetchByEmail(email: string): Promise<IUser> {
    const resp = await axios.get<IUser>(`${api}/api/v1/user?email=${email}`);

    if (resp.status !== 200) console.error('Error when fetching user data');

    return resp.data;
  }

  async function fetchUser(id: string): Promise<IUser> {
    const resp = await axios.get<IUser>(`${api}/api/v1/user/${id}`);

    if (resp.status !== 200) console.error('Error when fetching user data');

    return resp.data;
  }
  return {
    fetchByEmail,
    fetchUser,
  };
}
