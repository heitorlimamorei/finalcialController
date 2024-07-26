import { INewAccount } from '@/types/account';
import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useAccount() {
  async function createAccount(account: INewAccount) {
    const response = await axios.post(`${api}/account`, account);
    return response.data;
  }
  return { createAccount };
}
