'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';

import QuickMenuButton from '../QuickMenuButton';
import AccountBalanceCard from './Account';
import CreditCardBalanceCard from './CreditCard';

interface BalanceCardProps {
  openCreateItemModal: () => void;
  openChangeAccountModal: () => void;
  openChangeCreditCardModal: () => void;
}

export default function BalanceCard({
  openCreateItemModal,
  openChangeAccountModal,
  openChangeCreditCardModal,
}: BalanceCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const creditCardId = searchParams.get('creditcard');
  const accountId = searchParams.get('account');
  const userId = searchParams.get('u');

  const handleOpenSheetView = () => {
    if (creditCardId) {
      router.push(`/sheet?u=${userId}` + '&' + `cid=${creditCardId}`);
    } else {
      router.push(`/sheet?u=${userId}` + '&' + `aid=${accountId}`);
    }
  };

  return (
    <div
      className={`m-4 mt-5 rounded-3xl dark:bg-[#000826] bg-[#121826] ${creditCardId ? 'h-[19rem]' : 'h-[13rem]'} text-white`}>
      {creditCardId ? <CreditCardBalanceCard /> : <AccountBalanceCard />}
      <div
        className={`dark:bg-[#000826] bg-[#121826] ${creditCardId ? 'h-[30%]' : 'h-1/2'} rounded-b-2xl flex flex-row items-center justify-between`}>
        <QuickMenuButton label="Adicionar" onClick={openCreateItemModal}>
          <PaymentsIcon fontSize="large" />
        </QuickMenuButton>
        <QuickMenuButton label="Contas" onClick={openChangeAccountModal}>
          <AccountBalanceIcon fontSize="large" />
        </QuickMenuButton>
        <QuickMenuButton label="Cartões" onClick={openChangeCreditCardModal}>
          <CreditCardIcon fontSize="large" />
        </QuickMenuButton>
        <QuickMenuButton label="Histórico" onClick={handleOpenSheetView}>
          <HistoryIcon fontSize="large" />
        </QuickMenuButton>
      </div>
    </div>
  );
}
