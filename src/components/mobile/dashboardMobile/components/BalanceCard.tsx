import { IAccount } from '@/types/account';
import { ICreditCard } from '@/types/creditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';

import CreditCard from '@/components/common/CreditCard';

import QuickMenuButton from './QuickMenuButton';

interface BalanceCardProps {
  openCreateItemModal: () => void;
  openCreateCreditCardItemModal: () => void;
  openChangeAccountModal: () => void;
  openChangeCreditCardModal: () => void;
  openSheetView: () => void;
  accounts: IAccount[];
  creditCards: ICreditCard[];
  selectedAccount?: IAccount;
  selectedCreditCard?: ICreditCard;
}

export default function BalanceCard({
  openCreateItemModal,
  openChangeAccountModal,
  openCreateCreditCardItemModal,
  openChangeCreditCardModal,
  accounts,
  creditCards,
  openSheetView,
  selectedAccount,
  selectedCreditCard,
}: BalanceCardProps) {
  const account = selectedAccount && accounts.find((acc) => acc.id === selectedAccount.id);
  const creditCard =
    selectedCreditCard && creditCards.find((cc) => cc.id === selectedCreditCard.id);

  return (
    <div
      className={`m-4 mt-5 rounded-3xl dark:bg-[#000826] bg-[#121826] ${creditCard ? 'h-[19rem]' : 'h-[13rem]'} text-white`}>
      {creditCard ? (
        <div className="rounded-3xl h-[70%] flex flex-col items-center justify-start">
          <CreditCard creditCard={creditCard} />
        </div>
      ) : account ? (
        <div className="bg-green-500 rounded-2xl h-1/2 flex flex-col items-center justify-center">
          <h1 className="text-center text-lg">Seu balanço {account.nickname}</h1>
          <p className="text-center text-4xl font-bold">R${account.balance.toFixed(2)}</p>
        </div>
      ) : (
        <div className="h-1/2 flex items-center justify-center">
          <p className="text-center text-lg">Nenhuma conta ou cartão selecionado</p>
        </div>
      )}

      <div
        className={`dark:bg-[#000826] bg-[#121826] ${creditCard ? 'h-[30%]' : 'h-1/2'} rounded-b-2xl flex flex-row items-center justify-between`}>
        <QuickMenuButton
          label="Adicionar"
          onClick={creditCard ? openCreateCreditCardItemModal : openCreateItemModal}>
          <PaymentsIcon fontSize="large" />
        </QuickMenuButton>
        <QuickMenuButton label="Contas" onClick={openChangeAccountModal}>
          <AccountBalanceIcon fontSize="large" />
        </QuickMenuButton>
        <QuickMenuButton label="Cartões" onClick={openChangeCreditCardModal}>
          <CreditCardIcon fontSize="large" />
        </QuickMenuButton>
        <QuickMenuButton label="Histórico" onClick={openSheetView}>
          <HistoryIcon fontSize="large" />
        </QuickMenuButton>
      </div>
    </div>
  );
}
