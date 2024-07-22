'use client';
import { useState } from 'react';

import { IUser } from '@/types/user';

import ChangeAccountModal from '@/components/changeAccountModal/ChangeAccountModal';
import { CreateItemModal } from '@/components/createItemModal/CreateItemModal';
import { sheet } from '@/components/sheetMock';

import BalanceCard from './components/BalanceCard';

interface IDashboardMobileProps {
  user: IUser;
}

export default function DashboardMobile({ user }: IDashboardMobileProps) {
  const [isCreateItemOpen, setIsCreateItemOpen] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<string>('');
  const [isChangeAccountOpen, setIsChangeAccountOpen] = useState<boolean>(false);

  const handleCreateItemModal = () => {
    setIsCreateItemOpen((c) => !c);
  };
  const handleChangeAccountModal = () => {
    setIsChangeAccountOpen((c) => !c);
  };
  const handleChangeAccount = (id: string) => {
    setAccountId(id);
  };

  return (
    <div className="w-full h-[90%]">
      <CreateItemModal
        user={user}
        isOpen={isCreateItemOpen}
        onClose={handleCreateItemModal}
        accountId={accountId}
      />
      <ChangeAccountModal
        userId={user.id}
        onChange={handleChangeAccount}
        isOpen={isChangeAccountOpen}
        onClose={handleChangeAccountModal}
      />
      <BalanceCard
        openChangeAccountModal={handleChangeAccountModal}
        openCreateItemModal={handleCreateItemModal}
      />
      <div className="h-[70%] overflow-y-hidden py-2 px-4">
        <h1 className="font-bold text-3xl">Últimas atividades</h1>
        <ul>
          {sheet.map((item: any) => (
            <li
              key={item.id}
              className="h-[5rem] border-x-transparent border-t-gray-200 flex flex-col justify-end">
              <div className="flex flex-row justify-between items-center h-full">
                <div>
                  <h1 className="text-xl font-semibold">{item.name}</h1>
                  <p className="text-gray-500">30/06/2023</p>
                </div>
                <div className="flex items-center">
                  <p
                    className={`text-xl font-bold ${item.value > 0 ? 'text-green-500' : 'text-red-600'}`}>
                    R${item.value > 0 ? item.value : item.value * -1}
                  </p>
                </div>
              </div>
              <span className="h-[2px] w-full flex bg-gray-300"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
