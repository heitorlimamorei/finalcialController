import { IAccount } from '@/types/account';
import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

export function useAccount() {
  async function getAccounts(userId: string): Promise<IAccount[]> {
    try {
      const response = await axios.get<IAccount[]>(`${api}/account?owid=${userId}`);
      return response.data;
    } catch (error) {
      console.log('RESOURCES-ERROR: Account ' + JSON.stringify(error));
      return [];
    }
  }

  return {
    getAccounts,
  };
}
