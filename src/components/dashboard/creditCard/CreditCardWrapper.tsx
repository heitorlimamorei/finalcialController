'use client';

import { useState } from 'react';

import useCreditCard from '@/hook/useCreditCard';
import { IUser } from '@/types/user';

import CreateCreditCardItemModal from '@/components/createCreditCardItemModal/CreateCreditCardItemModal';
import CreditCardItemList from '@/components/mobile/dashboardMobile/components/CreditCardItemList';

interface ICreditCardWrapper {
  user: IUser;
  creditCardId: string;
}

export default function CreditCardWrapper({ user, creditCardId }: ICreditCardWrapper) {
  const [isCreateCreditCardItemOpen, setIsCreateCreditCardItemOpen] = useState<boolean>(false);

  const { creditCards = [], creditCardError, isLoadingCreditCards } = useCreditCard(user.id);

  const creditCard = creditCards.find((c) => c.id === creditCardId);

  if (!creditCard) {
    return <div>Error loading credit card data...</div>;
  }

  const toggleCreateCreditCardItemModal = () => {
    setIsCreateCreditCardItemOpen((c) => !c);
  };

  return (
    <div className="w-full h-[90%]">
      <CreateCreditCardItemModal
        user={user}
        sheetId={user.personalSpreadSheet}
        creditCardId={creditCard.id}
        onClose={toggleCreateCreditCardItemModal}
        isOpen={isCreateCreditCardItemOpen}
      />
      <div className="h-[70%] py-2">
        <h1 className="font-bold text-3xl px-2">Últimas atividades</h1>
        <div className="w-full h-full overflow-y-scroll">
          <CreditCardItemList
            ownerId={user.id}
            sheetId={user.personalSpreadSheet}
            creditCardId={creditCard.id}
          />
        </div>
      </div>
    </div>
  );
}
