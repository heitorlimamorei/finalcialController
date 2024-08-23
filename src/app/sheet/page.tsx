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

interface ISheetProps {
  searchParams: {
    u: string;
    cid: string;
    aid: string;
  };
}

export default function Sheet(props: ISheetProps) {
  const id = props.searchParams.u;

  const { data: user, error: userError } = useSWR<IUser>(`/user/${id}`, fetcher);
  const { data: accounts, error: accountError } = useSWR<IAccount[]>(
    `/account?owid=${id}`,
    fetcher,
  );
  const router = useRouter();

  const handleSelectAccount = (accountId: string) => {
    router.push(`/sheet?u=${id}&aid=${accountId}`);
  };

  if (userError) {
    return <div>Error loading data...</div>;
  }

  if (!user || !accounts) {
    return (
      <div className="h-[100vh] bg-gray-100 dark:bg-zinc-800">
        <Loading />
      </div>
    );
  }
  if (!props.searchParams.aid && !props.searchParams.cid) {
    return (
      <div className="h-[100vh] dark:text-white text-black p-2 bg-gray-100 dark:bg-zinc-800">
        <h1 className="text-xl font-bold">Selecione a conta para visualizar</h1>
        <ul>
          {accounts!.map((account) => (
            <li
              key={account.id}
              className="border-zinc-600 border-2 p-3 my-1 rounded-xl hover:cursor-pointer"
              onClick={() => handleSelectAccount(account.id)}>
              <h1 className="text-xl font-semibold">{account.nickname}</h1>
            </li>
          ))}
        </ul>
        <NavBar user={user} selectedButton="sheet" />
      </div>
    );
  }

  return (
    <div className="h-[100vh]">
      {props.searchParams.aid && <AccountView accountId={props.searchParams.aid} user={user} />}
      <NavBar user={user} selectedButton="sheet" />
    </div>
  );
}
