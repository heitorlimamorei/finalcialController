'use client';

import { useSearchParams } from 'next/navigation';

import { IAccount } from '@/types/account';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

export default function AccountBalanceCard() {
  const searchParams = useSearchParams();

  const owid = searchParams.get('u');
  const acid = searchParams.get('account');

  const {
    data: account,
    error,
    isLoading,
  } = useSWR<IAccount>(`/account/${acid}?owid=${owid}`, fetcher, {
    refreshInterval: 1000,
  });

  return (
    <div className="bg-green-500 rounded-2xl h-1/2 flex flex-col items-center justify-center">
      {account ? (
        <>
          <h1 className="text-center text-lg">Seu balanço {account.nickname}</h1>
          <p className="text-center text-4xl font-bold">R${account.balance.toFixed(2)}</p>
        </>
      ) : (
        <>
          <p>Carregando...</p>
        </>
      )}
    </div>
  );
}
