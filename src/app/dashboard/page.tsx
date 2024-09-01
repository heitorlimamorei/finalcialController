'use client';

import { useRouter } from 'next/navigation';

import useCreditCard from '@/hook/useCreditCard';
import { IAccount } from '@/types/account';
import { ICreditCard } from '@/types/creditCard';
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
    creditcard?: string;
  };
}

export default function Dashboard(props: IDashboardProps) {
  const id = props.searchParams.u;
  const accountId = props.searchParams?.account;
  const creditCardId = props.searchParams?.creditcard;

  const router = useRouter();

  const { data: accounts, error: accountsError } = useSWR<IAccount[]>(
    `/account?owid=${id}`,
    fetcher,
  );

  const { creditCards, error: creditCardError } = useCreditCard(id);

  const { data: user, error: userError } = useSWR<IUser>(`/user/${id}`, fetcher);

  if (accountsError || userError || creditCardError) {
    return <div>Error loading data...</div>;
  }

  if (!accounts || !user || !creditCards) {
    return <Loading />;
  }

  if (!accountId && !creditCardId) router.push(`/dashboard?u=${id}&account=${accounts[0].id}`);

  const account = accounts.find((c) => c.id === accountId);
  const creditCard = creditCardId ? creditCards.find((c) => c.id === creditCardId) : null;

  if (creditCardId && !creditCard) {
    return <div>Error loading creditCard data...</div>;
  }

  if (!account) {
    return <div>Error loading account data...</div>;
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black dark:bg-zinc-800 dark:text-white overflow-y-scroll">
      <div className="w-full h-full overflow-y-hidden">
        <WelcomeHeader name={user.name} />
        <DashboardMobile
          user={user}
          accounts={accounts}
          account={account}
          creditCard={creditCard as ICreditCard | null}
          creditCards={creditCards}
        />
      </div>
      <NavBar user={user} selectedButton={'home'} />
    </div>
  );
}
