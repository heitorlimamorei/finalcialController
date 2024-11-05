'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import useAccount from '@/hook/useAccount';
import useCreditCard from '@/hook/useCreditCard';
import { IUser } from '@/types/user';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import AccountView from '@/components/accountView/AccountView';
import CreditCard from '@/components/common/CreditCard';
import Loading from '@/components/common/Loading';
import NavBar from '@/components/common/NavBar';
import CreditCardView from '@/components/creditCardView/CreditCardView';

interface ISheetProps {
  searchParams: {
    u: string;
    account?: string;
    creditcard?: string;
  };
}

export default function Sheet(props: ISheetProps) {
  const id = props.searchParams.u;

  const { data: user, error: userError } = useSWR<IUser>(`/user/${id}`, fetcher);
  const { accounts, accountsError, isLoadingAccounts } = useAccount(id);
  const { creditCards, creditCardsError, isLoadingCreditCards } = useCreditCard(id);

  const router = useRouter();

  const handleSelectAccount = (accountId: string) => {
    router.push(`/sheet?u=${id}&account=${accountId}`);
  };

  const handleSelectedCreditCard = (creditCardId: string) => {
    router.push(`/sheet?u=${id}&creditcard=${creditCardId}`);
  };

  const selectedCreditCard = creditCards
    ? creditCards.find((creditcard) => creditcard.id == props.searchParams.creditcard)
    : undefined;

  if (!selectedCreditCard && props.searchParams.creditcard) {
    return <div>Cartão não encontrado</div>;
  }

  if (userError) {
    return <div>Error loading data...</div>;
  }

  if (!user || isLoadingAccounts || isLoadingCreditCards) {
    return (
      <div className="h-[100vh] bg-gray-100 dark:bg-zinc-800">
        <Loading />
      </div>
    );
  }

  if (!props.searchParams.account && !props.searchParams.creditcard) {
    return (
      <div className="h-[100vh] dark:text-white text-black p-2 bg-gray-100 dark:bg-zinc-800">
        <h1 className="text-xl font-bold">Selecione a conta ou cartão para visualizar</h1>
        <ul>
          {accounts &&
            accounts.map((account) => (
              <li
                key={account.id}
                className="border-zinc-600 border-2 p-3 my-1 rounded-xl hover:cursor-pointer"
                onClick={() => handleSelectAccount(account.id)}>
                <h1 className="text-xl font-semibold">{account.nickname}</h1>
              </li>
            ))}
        </ul>
        <ul>
          {creditCards &&
            creditCards.map((creditCard) => (
              <CreditCard
                creditCard={creditCard}
                key={creditCard.id}
                onClick={() => handleSelectedCreditCard(creditCard.id)}
              />
            ))}
        </ul>
        <NavBar user={user} selectedButton="sheet" />
      </div>
    );
  }

  return (
    <div className="h-[100vh] text-black dark:text-white">
      {props.searchParams.account && (
        <AccountView accountId={props.searchParams.account} user={user} />
      )}
      {props.searchParams.creditcard && (
        <CreditCardView
          sheetId={user.personalSpreadSheet}
          user={user}
          creditCard={selectedCreditCard!}
        />
      )}
      <NavBar user={user} selectedButton="sheet" />
    </div>
  );
}
