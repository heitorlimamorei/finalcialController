import { IAccount } from '@/types/account';
import { ICreditCard } from '@/types/creditCard';
import fetcher from '@/utils/fetcher';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';
import useSWR from 'swr';

import QuickMenuButton from './QuickMenuButton';

interface BalanceCardProps {
  openCreateItemModal: () => void;
  openChangeAccountModal: () => void;
  openSheetView: () => void;
  accounts: IAccount[];
  creditCards: ICreditCard[];
  selectedAccount?: IAccount;
  selectedCreditCard?: ICreditCard;
}

export default function BalanceCard({
  openCreateItemModal,
  openChangeAccountModal,
  accounts,
  creditCards,
  openSheetView,
  selectedAccount,
  selectedCreditCard,
}: BalanceCardProps) {
  let account;
  let creditCard;

  if (selectedCreditCard) {
    if (creditCards) {
      creditCard = creditCards.find((creditCard) => creditCard.id === selectedCreditCard.id);
    }
    if (!creditCard) {
      return;
    }
  }

  if (selectedAccount) {
    if (accounts) {
      account = accounts.find((account) => account.id === selectedAccount.id);
    }
    if (!account) {
      return;
    }
  }
  return (
    <div className="m-4 rounded-2xl dark:bg-[#000826] bg-[#121826] h-[13rem] text-white">
      {creditCard && (
        <div className="bg-green-500 rounded-2xl h-1/2 flex flex-col items-center justify-center"></div>
      )}

      {account && (
        <div className="bg-green-500 rounded-2xl h-1/2 flex flex-col items-center justify-center">
          <h1 className="text-center text-lg">Seu balanço {account.nickname}</h1>
          <p className="text-center text-4xl font-bold">R${account.balance.toFixed(2)}</p>
        </div>
      )}

      <div className="dark:bg-[#000826] bg-[#121826] h-1/2 rounded-b-2xl flex flex-row justify-between">
        <QuickMenuButton label="Adicionar" onClick={openCreateItemModal}>
          <PaymentsIcon fontSize="large" />
        </QuickMenuButton>
        <QuickMenuButton label="Contas" onClick={openChangeAccountModal}>
          <AccountBalanceIcon fontSize="large" />
        </QuickMenuButton>
        <QuickMenuButton label="Cartões" onClick={openChangeAccountModal}>
          <CreditCardIcon fontSize="large" />
        </QuickMenuButton>
        <QuickMenuButton label="Histórico" onClick={openSheetView}>
          <HistoryIcon fontSize="large" />
        </QuickMenuButton>
      </div>
    </div>
  );
}
