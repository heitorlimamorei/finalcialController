import { INewAccount } from '@/types/account';
import { IAccount } from '@/types/account';
import fetcher, { parseError } from '@/utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useAccount(ownerId: string) {
  const {
    data: accounts,
    error,
    isLoading: isLoadingAccounts,
  } = useSWR<IAccount[]>(ownerId ? `/account?owid=${ownerId}` : null, fetcher);

  const errorObj = error ? parseError(error.message) : null;
  const errorF = errorObj?.statuscode == 404 ? null : errorObj;

  async function createAccount(account: INewAccount) {
    const response = await axios.post(`${api}/account`, account);
    return response.data;
  }

  if (errorObj) {
    if (errorObj.statuscode == 404) {
      return { accounts: [], accountsError: null, isLoadingAccounts: false, createAccount };
    }
  }

  return {
    accounts: accounts ? accounts : [],
    accountsError: errorF,
    isLoadingAccounts,
    createAccount,
  };
}
