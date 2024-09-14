import { INewAccount } from '@/types/account';
import { IAccount } from '@/types/account';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useAccount(ownerId: string) {
  const {
    data: accounts,
    error: accountsError,
    isLoading: isLoadingAccounts,
  } = useSWR<IAccount[]>(ownerId ? `/account?owid=${ownerId}` : null, fetcher);

  async function createAccount(account: INewAccount) {
    const response = await axios.post(`${api}/account`, account);
    return response.data;
  }

  return { accounts, accountsError, isLoadingAccounts, createAccount };
}
