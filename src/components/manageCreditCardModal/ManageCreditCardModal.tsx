import { useEffect, useState } from 'react';

import useCreditCard from '@/hook/useCreditCard';
import { ICreditCard } from '@/types/creditCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import BaseModal from '../common/BaseModal';
import Button from '../common/Button';
import CreditCard from '../common/CreditCard';
import Loading from '../common/Loading';
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
  const { handleDeleteCard, creditCards, isLoadingCreditCards, handleCreateCreditCard } =
    useCreditCard(ownerId);
  const [creatingCreditCard, setCreatingCreditCard] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCreatingCreditCard(false), 200);
    }
  }, [isOpen]);

  const toggleCreatingCreditCard = () => {
    setCreatingCreditCard((prev) => !prev);
  };

  if (!creditCards || isLoadingCreditCards) {
    return (
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <Loading />
      </BaseModal>
    );
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {!creatingCreditCard ? (
        <div
          className={`w-full h-full overflow-hidden transition-transform duration-300 ${creatingCreditCard ? 'translate-x-full' : 'translate-x-0'}`}>
          <div className="w-full flex flex-row items-center justify-between p-2">
            <h1 className="text-xl font-bold">Seus Cartões</h1>
            <Button
              className="bg-green-500 h-fit text-white p-2"
              onClick={toggleCreatingCreditCard}>
              <AddCircleIcon />
            </Button>
          </div>
          <div className="w-full h-[80%] overflow-y-scroll px-2">
            {creditCards.map((creditCard: ICreditCard) => (
              <CreditCard
                key={creditCard.id}
                creditCard={creditCard}
                handleDeleteCard={handleDeleteCard}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`transition-transform duration-300 w-full h-full ${creatingCreditCard ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
          <CreateCreditCardForm
            onClose={onClose}
            onSubmit={handleCreateCreditCard}
            ownerId={ownerId}
          />
        </div>
      )}
    </BaseModal>
  );
}
