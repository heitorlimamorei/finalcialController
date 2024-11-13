'use client';

import { useSearchParams } from 'next/navigation';

import { IAPICreditCard } from '@/types/creditCard';
import { sanitizeCreditCard } from '@/utils/creditCardUtils';
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
  } = useSWR<IAPICreditCard>(`/credit-card/${cid}?owid=${owid}`, fetcher, {
    refreshInterval: 1000,
  });

  return (
    <div className="rounded-3xl h-[70%] flex flex-col items-center justify-start">
      {creditCard ? (
        <CreditCard creditCard={sanitizeCreditCard(creditCard)} />
      ) : isLoading ? (
        <div className="text-center text-lg">Carregando...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">
          Ocorreu um erro ao carregar o cartão de crédito.
        </div>
      ) : null}
    </div>
  );
}
