import { IAccount } from '@/types/account';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import { ClockIcon, CurrencyIcon, TransferIcon } from '@/components/icons/Icons';

import QuickMenuButton from './QuickMenuButton';

interface BalanceCardProps {
  openCreateItemModal: () => void;
  openChangeAccountModal: () => void;
  selectedAccount: IAccount;
}

export default function BalanceCard({
  openCreateItemModal,
  openChangeAccountModal,
  selectedAccount,
}: BalanceCardProps) {
  const { data: accounts, error: accountsError } = useSWR<IAccount[]>(
    `/account?owid=${selectedAccount.ownerId}`,
    fetcher,
  );
  let account;
  if (accounts) {
    account = accounts.find((account) => account.id === selectedAccount.id);
  }
  if (!account) {
    return;
  }
  return (
    <div className="m-4 rounded-2xl dark:bg-[#000826] bg-[#121826] h-[13rem] text-white">
      <div className="bg-green-500 rounded-2xl h-1/2 flex flex-col items-center justify-center">
        <h1 className="text-center text-lg">Seu balanço {account.nickname}</h1>
        <p className="text-center text-4xl font-bold">R${account.balance.toFixed(2)}</p>
      </div>
      <div className="dark:bg-[#000826] bg-[#121826] h-1/2 rounded-b-2xl flex flex-row justify-between px-6">
        <QuickMenuButton icon={CurrencyIcon} label="Adicionar" onClick={openCreateItemModal} />
        <QuickMenuButton icon={TransferIcon} label="Alternar" onClick={openChangeAccountModal} />
        <QuickMenuButton icon={ClockIcon} label="Histórico" onClick={openCreateItemModal} />
      </div>
    </div>
  );
}
