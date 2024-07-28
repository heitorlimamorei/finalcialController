'use client';

import { useRouter } from 'next/navigation';

import { IAccount } from '@/types/account';
import { IUser } from '@/types/user';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import Loading from '@/components/common/Loading';
import NavBar from '@/components/common/NavBar';
import DashboardMobile from '@/components/mobile/dashboardMobile/DashboardMobile';
import WelcomeHeader from '@/components/mobile/dashboardMobile/WelcomeHeader';

interface IDashboardProps {
  searchParams: {
    u: string;
    account?: string;
  };
}

export default function Dashboard(props: IDashboardProps) {
  const id = props.searchParams.u;
  const accountId = props.searchParams?.account;

  const router = useRouter();

  const { data: accounts, error: accountsError } = useSWR<IAccount[]>(
    `/account?owid=${id}`,
    fetcher,
  );

  const { data: user, error: userError } = useSWR<IUser>(`/user/${id}`, fetcher);

  if (accountsError || userError) {
    return <div>Error loading data...</div>;
  }

  if (!accounts || !user) {
    return <Loading />;
  }

  if (!accountId) router.push(`/dashboard?u=${id}&account=${accounts[0].id}`);

  const account = accounts.find((c) => c.id === accountId);

  if (!account) {
    return <div>Error loading account data...</div>;
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black dark:bg-zinc-800 dark:text-white overflow-y-scroll">
      <div className="w-full h-full overflow-y-hidden">
        <WelcomeHeader name={user.name} />
        <DashboardMobile user={user} accounts={accounts} account={account} />
      </div>
      <NavBar user={user} selectedButton={'home'} />
    </div>
  );
}
