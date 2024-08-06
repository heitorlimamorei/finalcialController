'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { IAccount } from '@/types/account';
import { IUser } from '@/types/user';

import ChangeAccountModal from '@/components/changeAccountModal/ChangeAccountModal';
import { CreateItemModal } from '@/components/createItemModal/CreateItemModal';

import BalanceCard from './components/BalanceCard';
import ItemList from './components/ItemList';

interface IDashboardMobileProps {
  user: IUser;
  accounts: IAccount[];
  account: IAccount;
}

export default function DashboardMobile({ user, accounts, account }: IDashboardMobileProps) {
  const [isCreateItemOpen, setIsCreateItemOpen] = useState<boolean>(false);
  const [isChangeAccountOpen, setIsChangeAccountOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleCreateItemModal = () => {
    setIsCreateItemOpen((c) => !c);
  };

  const handleChangeAccountModal = () => {
    setIsChangeAccountOpen((c) => !c);
  };

  const handleChangeAccount = (c: IAccount) => {
    router.push(`/dashboard?u=${user.id}&account=${c.id}`);
  };

  return (
    <div className="w-full h-[90%]">
      <CreateItemModal
        user={user}
        isOpen={isCreateItemOpen}
        onClose={handleCreateItemModal}
        accountId={account.id}
      />
      <ChangeAccountModal
        onChange={handleChangeAccount}
        isOpen={isChangeAccountOpen}
        onClose={handleChangeAccountModal}
        accounts={accounts}
      />
      <BalanceCard
        selectedAccount={account}
        openChangeAccountModal={handleChangeAccountModal}
        openCreateItemModal={handleCreateItemModal}
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
