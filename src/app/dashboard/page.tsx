'use client';
import { useEffect, useState } from 'react';

import { useAccount } from '@/hook/useAccount';
import { useFetchUserData } from '@/hook/useFetchUserData';
import { IAccount } from '@/types/account';
import { IUser } from '@/types/user';
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
  const { fetchUser } = useFetchUserData();
  const { getAccounts } = useAccount();
  const id = props.searchParams.u;

  const {
    data: accounts,
    error: accountsError,
    isLoading: accountsLoading,
  } = useSWR<IAccount[]>(id, getAccounts);
  const { data: user, error: userError, isLoading: userLoading } = useSWR<IUser>(id, fetchUser);

  if (accountsLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (accountsError || userError || !accounts || !user) {
    return <div>Error loading data...</div>;
  } else {
    return (
      <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
        <div className="w-full h-full overflow-y-hidden">
          <WelcomeHeader name={user?.name} />
          <DashboardMobile user={user} accounts={accounts} />
        </div>
        <NavBar user={user} selectedButton={'home'} />
      </div>
    );
  }
}
