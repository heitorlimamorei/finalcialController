'use client';
import { useState } from 'react';

import { IAccount } from '@/types/account';
import { IUser } from '@/types/user';

import ChangeAccountModal from '@/components/changeAccountModal/ChangeAccountModal';
import { CreateItemModal } from '@/components/createItemModal/CreateItemModal';

import BalanceCard from './components/BalanceCard';
import ItemList from './components/ItemList';

interface IDashboardMobileProps {
  user: IUser;
  accounts: IAccount[];
}

export default function DashboardMobile({ user, accounts }: IDashboardMobileProps) {
  const [isCreateItemOpen, setIsCreateItemOpen] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>(accounts[0]);
  const [isChangeAccountOpen, setIsChangeAccountOpen] = useState<boolean>(false);

  const handleCreateItemModal = () => {
    setIsCreateItemOpen((c) => !c);
  };

  const handleChangeAccountModal = () => {
    setIsChangeAccountOpen((c) => !c);
  };

  const handleChangeAccount = (account: IAccount) => {
    setSelectedAccount(account);
  };

  if (!selectedAccount) return <p>Não existe conta selecionada</p>;

  return (
    <div className="w-full h-[90%]">
      <CreateItemModal
        user={user}
        isOpen={isCreateItemOpen}
        onClose={handleCreateItemModal}
        accountId={selectedAccount.id}
      />
      <ChangeAccountModal
        onChange={handleChangeAccount}
        isOpen={isChangeAccountOpen}
        onClose={handleChangeAccountModal}
        accounts={accounts}
      />
      <BalanceCard
        selectedAccount={selectedAccount}
        openChangeAccountModal={handleChangeAccountModal}
        openCreateItemModal={handleCreateItemModal}
      />
      <div className="h-[70%] py-2">
        <h1 className="font-bold text-3xl px-2">Últimas atividades</h1>
        <div className="w-full h-full overflow-y-scroll">
          <ItemList sheetId={user.personalSheetId} accountId={selectedAccount.id} />
        </div>
      </div>
    </div>
  );
}
