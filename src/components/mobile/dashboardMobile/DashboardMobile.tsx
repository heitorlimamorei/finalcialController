'use client';
import { useState } from 'react';

import { IUser } from '@/types/user';

import ChangeDashboardView from '@/components/dashboard/ChangeDashboardView';

import BalanceCard from './components/BalanceCard';
import CreateItemWrapper from './components/CreateItemWrapper';
import RenderItemsWrapper from './components/RenderItemsWrapper';

interface IDashboardMobileProps {
  user: IUser;
}

export default function DashboardMobile({ user }: IDashboardMobileProps) {
  const [isCreateItemOpen, setIsCreateItemOpen] = useState<boolean>(false);
  const [isChangeAccountOpen, setIsChangeAccountOpen] = useState<boolean>(false);
  const [isCreditCardOpen, setIsCreditCardOpen] = useState<boolean>(false);

  const toggleCreateItemModal = () => {
    setIsCreateItemOpen((c) => !c);
  };

  const toggleChangeAccountModal = () => {
    setIsChangeAccountOpen((c) => !c);
  };

  const toggleChangeCreditCardModal = () => {
    setIsCreditCardOpen((c) => !c);
  };

  return (
    <div className="w-full h-[90%]">
      <CreateItemWrapper
        user={user}
        toggleIsOpen={toggleCreateItemModal}
        isOpen={isCreateItemOpen}
      />
      <ChangeDashboardView
        isChangeAccountOpen={isChangeAccountOpen}
        isCreditCardOpen={isCreditCardOpen}
        toggleChangeCreditCardModal={toggleChangeCreditCardModal}
        toggleChangeAccountModal={toggleChangeAccountModal}
      />
      <BalanceCard
        openChangeAccountModal={toggleChangeAccountModal}
        openChangeCreditCardModal={toggleChangeCreditCardModal}
        openCreateItemModal={toggleCreateItemModal}
      />
      <div className="h-[70%] py-2">
        <h1 className="font-bold text-3xl px-2">Últimas atividades</h1>
        <div className="w-full h-full overflow-y-scroll">
          <RenderItemsWrapper user={user} />
        </div>
      </div>
    </div>
  );
}
