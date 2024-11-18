'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import { IAccount } from '@/types/account';
import { IUser } from '@/types/user';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import AccountView from '@/components/accountView/AccountView';
import Loading from '@/components/common/Loading';
import NavBar from '@/components/common/NavBar';
import useGetParams from '@/hook/useGetParams';
import useParams from '@/hook/useParams';

interface ISheetProps {
  searchParams: {
    u: string;
    cid: string;
    aid: string;
  };
}

export default function Sheet(props: ISheetProps) {
  const id = props.searchParams.u;

  const { data: user, error: userError } = useSWR<IUser>(
    `/user/${id}`,
    fetcher,
  );
  const { data: accounts, error: accountError } = useSWR<IAccount[]>(
    `/account?owid=${id}`,
    fetcher,
  );
  const router = useRouter();
  const { getParams } = useParams();
  const { currentSelectionType, currentSelectionValue } = getParams();

  const handleSelectAccount = (accountId: string) => {
    router.push(`/sheet?u=${id}&aid=${accountId}`);
  };

  if (!currentSelectionValue) {
    router.push(`/dashboard?u=${id}`);
    return;
  }

  if (userError || accountError) {
    return <div>Error loading data...</div>;
  }

  if (!user || !accounts) {
    return (
      <div className="h-[100vh] bg-gray-100 dark:bg-zinc-800">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-[100vh]">
      {currentSelectionType === 'account' && (
        <AccountView accountId={currentSelectionValue} user={user} />
      )}
      <NavBar u={props.searchParams.u} selectedButton="sheet" />
    </div>
  );
}
