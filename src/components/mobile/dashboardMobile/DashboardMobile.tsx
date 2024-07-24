'use client';
import { useEffect, useState } from 'react';

import { IAccount } from '@/types/account';
import { IUser } from '@/types/user';
import axios from 'axios';

import ChangeAccountModal from '@/components/changeAccountModal/ChangeAccountModal';
import { CreateItemModal } from '@/components/createItemModal/CreateItemModal';

import BalanceCard from './components/BalanceCard';
import ItemList from './components/ItemList';

interface IDashboardMobileProps {
  user: IUser;
  accounts: IAccount[];
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardMobile({ user, accounts }: IDashboardMobileProps) {
  const [isCreateItemOpen, setIsCreateItemOpen] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>(accounts[0]);
  const [isChangeAccountOpen, setIsChangeAccountOpen] = useState<boolean>(false);

  const changeBalance = (amount: number) => {
    selectedAccount.balance += amount;
  };

  const handleCreateItemModal = () => {
    setIsCreateItemOpen((c) => !c);
  };

  const handleChangeAccountModal = () => {
    setIsChangeAccountOpen((c) => !c);
  };

  const handleChangeAccount = (account: IAccount) => {
    setSelectedAccount(account);
  };

  if (!selectedAccount) return null;
  return (
    <div className="w-full h-[90%]">
      <CreateItemModal
        changeBalance={changeBalance}
        user={user}
        isOpen={isCreateItemOpen}
        onClose={handleCreateItemModal}
        accountId={selectedAccount.id}
      />
      <ChangeAccountModal
        userId={user.id}
        onChange={handleChangeAccount}
        isOpen={isChangeAccountOpen}
        onClose={handleChangeAccountModal}
      />
      <BalanceCard
        account={selectedAccount}
        openChangeAccountModal={handleChangeAccountModal}
        openCreateItemModal={handleCreateItemModal}
      />
      <div className="h-[70%] overflow-y-hidden py-2 px-4">
        <h1 className="font-bold text-3xl">Últimas atividades</h1>
        <ItemList sheetId={user.personalSheetId} />
      </div>
    </div>
  );
}
