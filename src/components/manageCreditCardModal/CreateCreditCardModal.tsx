import { useEffect, useState } from 'react';

import useCreditCard from '@/hook/useCreditCard';
import { ICreditCard } from '@/types/creditCard';

import BaseModal from '../common/BaseModal';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { PlusIcon, TrashIcon } from '../icons/Icons';
import CreateCreditCardForm from './CreateCreditCardForm';

interface IManageCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerId: string;
}

export default function ManageCreditCardsModal({
  isOpen,
  onClose,
  ownerId,
}: IManageCreditCardModalProps) {
  const { handleDeleteCard, creditCards, isLoading, handleCreateCreditCard } =
    useCreditCard(ownerId);
  const [creatingCreditCard, setCreatingCreditCard] = useState(false);
  const [creatingCreditCardTransition, setCreatingCreditCardTransition] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCreatingCreditCard(false);
        setCreatingCreditCardTransition(false);
      }, 200);
    }
  }, [isOpen]);

  const handleEnterCreatingCreditCard = (value: boolean) => {
    if (value !== creatingCreditCard) {
      setCreatingCreditCardTransition(value);
      setTimeout(() => setCreatingCreditCard(value), 200);
    } else {
      setCreatingCreditCard(value);
      setTimeout(() => setCreatingCreditCardTransition(value), 10);
    }
  };

  if (!creditCards || isLoading) {
    return (
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <Loading />
      </BaseModal>
    );
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={'p-3 relative '}>
        {!creatingCreditCard && (
          <div
            className={`w-full h-full overflow-hidden transition-transform duration-300 ${creatingCreditCardTransition === false ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="w-full flex flex-row items-center justify-between p-2">
              <h1 className="text-xl font-bold">Seus Cartões</h1>
              <Button
                className="bg-green-500 h-fit px-2 py-2 text-white"
                onClick={() => handleEnterCreatingCreditCard(true)}>
                {PlusIcon(8)}
              </Button>
            </div>
            <div className="w-full h-full">
              {creditCards.map((creditCard: ICreditCard) => (
                <div
                  key={creditCard.id}
                  className="flex flex-row items-center justify-between border-2 border-gray-500 p-5 my-2 rounded-xl">
                  <h1 className="text-xl font-bold">{creditCard.nickname}</h1>
                  <Button
                    onClick={() => handleDeleteCard(creditCard.id)}
                    className="p-1 text-red-400 border-2 border-gray-400">
                    {TrashIcon(6)}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {creatingCreditCardTransition && (
          <div
            className={`transition-transform duration-300 w-full h-full ${creatingCreditCard === true ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
            <CreateCreditCardForm
              onClose={onClose}
              onSubmit={handleCreateCreditCard}
              ownerId={ownerId}
            />
          </div>
        )}
      </div>
    </BaseModal>
  );
}
