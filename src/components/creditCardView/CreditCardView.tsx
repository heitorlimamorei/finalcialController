import React, { useState } from 'react';

import useCreditCardItems from '@/hook/useCreditCardItems';
import { ICreditCard } from '@/types/creditCard';
import { IUser } from '@/types/user';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Button from '../common/Button';
import Loading from '../common/Loading';
import CreateCreditCardItemModal from '../createCreditCardItemModal/CreateCreditCardItemModal';
import DetailedCreditCardItemsList from '../detailedCreditCardItemsList/DetailedCreditCardItemsList';

interface ICreditCardViewProps {
  user: IUser;
  creditCard: ICreditCard;
  sheetId: string;
}

export default function CreditCardView({ user, creditCard, sheetId }: ICreditCardViewProps) {
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const { creditCardItemsF, creditCardItemError, creditCardIsLoading } = useCreditCardItems(
    user.id,
    creditCard.id,
    sheetId,
  );
  const handleCreateItemModal = () => {
    setIsCreatingItem((c) => !c);
  };

  if (creditCardItemError) {
    return <div>{creditCardItemError}</div>;
  }
  if (!creditCardItemsF) {
    return <div></div>;
  }

  if (creditCardIsLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full dark:bg-zinc-800 bg-gray-200">
      <CreateCreditCardItemModal
        user={user}
        sheetId={user.personalSpreadSheet}
        creditCardId={creditCard.id}
        isOpen={isCreatingItem}
        onClose={handleCreateItemModal}
      />
      <div className="p-2 flex flex-row justify-between w-full">
        <h1 className="text-2xl font-bold">Seu cartão: {creditCard.nickname}</h1>
        <Button
          className="bg-green-500 px-2 py-1 text-white text-xl flex flex-row items-center font-semibold justify"
          onClick={handleCreateItemModal}>
          <p className="mr-1">Criar</p>
          <AddCircleIcon />
        </Button>
      </div>
      <DetailedCreditCardItemsList
        creditCardItems={creditCardItemsF}
        sheetId={sheetId}
        user={user}
      />
    </div>
  );
}
