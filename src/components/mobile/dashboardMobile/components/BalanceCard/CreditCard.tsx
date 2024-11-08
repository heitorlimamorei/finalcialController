'use client';

import { useSearchParams } from 'next/navigation';

import { ICreditCard } from '@/types/creditCard';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import CreditCard from '@/components/common/CreditCard';

export default function CreditCardBalanceCard() {
  const searchParams = useSearchParams();

  const owid = searchParams.get('u');
  const cid = searchParams.get('creditcard');

  const {
    data: creditCard,
    error,
    isLoading,
  } = useSWR<ICreditCard>(`/credit-card/${cid}?owid=${owid}`, fetcher);

  return (
    <div className={'m-4 mt-5 rounded-3xl dark:bg-[#000826] bg-[#121826] h-[19rem] text-white'}>
      <div className="rounded-3xl h-[70%] flex flex-col items-center justify-start">
        {creditCard ? (
          <CreditCard creditCard={creditCard} />
        ) : isLoading ? (
          <div className="text-center text-lg">Carregando...</div>
        ) : error ? (
          <div className="text-center text-lg text-red-500">
            Ocorreu um erro ao carregar o cartão de crédito.
          </div>
        ) : null}
      </div>
    </div>
  );
}
