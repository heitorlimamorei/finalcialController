'use client';

import { IAccount } from '@/types/account';
import { IUser } from '@/types/user';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import NavBar from '@/components/common/NavBar';
import DashboardMobile from '@/components/mobile/dashboardMobile/DashboardMobile';
import WelcomeHeader from '@/components/mobile/dashboardMobile/WelcomeHeader';

interface IDashboardProps {
  searchParams: {
    u: string;
  };
}

export default function Dashboard(props: IDashboardProps) {
  const id = props.searchParams.u;

  const { data: accounts, error: accountsError } = useSWR<IAccount[]>(
    `/account?owid=${id}`,
    fetcher,
  );

  const { data: user, error: userError } = useSWR<IUser>(`/user/${id}`, fetcher);

  if (accountsError || userError) {
    return <div>Error loading data...</div>;
  }

  if (!accounts || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
      <div className="w-full h-full overflow-y-hidden">
        <WelcomeHeader name={user.name} />
        <DashboardMobile user={user} accounts={accounts} />
      </div>
      <NavBar user={user} selectedButton={'home'} />
    </div>
  );
}
