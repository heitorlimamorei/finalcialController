'use client';

import { useRouter } from 'next/navigation';

import { IUser } from '@/types/user';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import NavBar from '@/components/common/NavBar';
import DashboardMobile from '@/components/mobile/dashboardMobile/DashboardMobile';
import WelcomeHeader from '@/components/mobile/dashboardMobile/WelcomeHeader';

interface IDashboardProps {
  searchParams: {
    u: string;
    account?: string;
    creditcard?: string;
  };
}

export default function Dashboard(props: IDashboardProps) {
  const id = props.searchParams.u;
  const accountId = props.searchParams?.account;
  const creditCardId = props.searchParams?.creditcard;

  const { data: user, error: userError } = useSWR<IUser>(`/user/${id}`, fetcher);

  if (userError) {
    return <div>Error loading user data...</div>;
  }

  if (!user) return <div></div>;

  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black dark:bg-zinc-800 dark:text-white overflow-y-scroll">
      <div className="w-full h-full overflow-y-hidden">
        <WelcomeHeader name={user.name} />
        <DashboardMobile user={user} />
      </div>
      <NavBar
        u={props.searchParams.u}
        cid={creditCardId}
        acid={accountId}
        selectedButton={'home'}
      />
    </div>
  );
}
