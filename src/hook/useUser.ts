import { IUser } from '@/types/user';
import fetcher, { parseError } from '@/utils/fetcher';
import useSWR from 'swr';

export default function useUser(userId: string) {
  const { data: user, error: userError } = useSWR<IUser>(`/user/${userId}`, fetcher);

  const errorF = userError ? parseError(userError.message) : null;

  return {
    user,
    userError: errorF,
  };
}
