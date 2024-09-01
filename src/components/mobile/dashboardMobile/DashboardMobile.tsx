'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { IAccount } from '@/types/account';
import { ICreditCard } from '@/types/creditCard';
import { IUser } from '@/types/user';

import ChangeAccountModal from '@/components/changeAccountModal/ChangeAccountModal';
import ChangeCreditCardModal from '@/components/changeCreditCardModal/ChangeCreditCardModa';
import { CreateItemModal } from '@/components/createItemModal/CreateItemModal';

import BalanceCard from './components/BalanceCard';
import ItemList from './components/ItemList';

interface IDashboardMobileProps {
  user: IUser;
  accounts: IAccount[];
  creditCard: ICreditCard | null;
  creditCards: ICreditCard[];
  account: IAccount;
}

export default function DashboardMobile({
  user,
  accounts,
  account,
  creditCards,
}: IDashboardMobileProps) {
  const [isCreateItemOpen, setIsCreateItemOpen] = useState<boolean>(false);
  const [isChangeAccountOpen, setIsChangeAccountOpen] = useState<boolean>(false);
  const [isCreditCardOpen, setIsCreditCardOpen] = useState<boolean>(false);

  const router = useRouter();

  const toggleCreateItemModal = () => {
    setIsCreateItemOpen((c) => !c);
  };

  const toggleChangeAccountModal = () => {
    setIsChangeAccountOpen((c) => !c);
  };

  const toggleChangeCreditCardModal = () => {
    setIsCreditCardOpen((c) => !c);
  };

  const handleChangeAccount = (c: IAccount) => {
    router.push(`/dashboard?u=${user.id}&account=${c.id}`);
  };

  const handleChangeCreditCard = (c: ICreditCard) => {
    router.push(`/dashboard?u=${user.id}&creditcard=${c.id}&account=${accounts[0].id}`);
  };

  const handleOpenSheetView = () => {
    router.push(`/sheet?u=${user.id}` + '&' + `aid=${account.id}`);
  };

  return (
    <div className="w-full h-[90%]">
      <CreateItemModal
        user={user}
        isOpen={isCreateItemOpen}
        onClose={toggleCreateItemModal}
        accountId={account.id}
      />
      <ChangeAccountModal
        onChange={handleChangeAccount}
        isOpen={isChangeAccountOpen}
        onClose={toggleChangeAccountModal}
        accounts={accounts}
      />
      <ChangeCreditCardModal
        onChange={handleChangeCreditCard}
        isOpen={isCreditCardOpen}
        onClose={toggleChangeCreditCardModal}
        creditCards={creditCards}
      />
      <BalanceCard
        selectedAccount={account}
        openChangeAccountModal={toggleChangeAccountModal}
        openCreateItemModal={toggleCreateItemModal}
        openSheetView={handleOpenSheetView}
      />
      <div className="h-[70%] py-2">
        <h1 className="font-bold text-3xl px-2">Últimas atividades</h1>
        <div className="w-full h-full overflow-y-scroll">
          <ItemList sheetId={user.personalSpreadSheet} accountId={account.id} />
        </div>
      </div>
    </div>
  );
}
