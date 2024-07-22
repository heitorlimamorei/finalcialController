import { IUser } from '@/types/user';
import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

export function useFetchUserData() {
  async function fetchByEmail(email: string): Promise<IUser> {
    const resp = await axios.get<IUser>(`${api}/user?email=${email}`);

    if (resp.status !== 200) console.error('Error when fetching user data');

    return resp.data;
  }

  async function fetchUser(id: string): Promise<IUser> {
    const resp = await axios.get<IUser>(`${api}/user/${id}`);

    if (resp.status !== 200) console.error('Error when fetching user data');

    return resp.data;
  }
  return {
    fetchByEmail,
    fetchUser,
  };
}
