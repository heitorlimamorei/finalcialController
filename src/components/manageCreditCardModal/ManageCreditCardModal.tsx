import { useEffect, useState } from 'react';

import Image from 'next/image';

import eloLogo from '@/../public/elo-1.svg';
import mastercardLogo from '@/../public/mc_symbol.svg';
import visaLogo from '@/../public/visa.png';
import useCreditCard from '@/hook/useCreditCard';
import { ICreditCard } from '@/types/creditCard';
import DeleteIcon from '@mui/icons-material/Delete';

import BaseModal from '../common/BaseModal';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { PlusIcon } from '../icons/Icons';
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

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCreatingCreditCard(false), 200);
    }
  }, [isOpen]);

  const toggleCreatingCreditCard = () => {
    setCreatingCreditCard((prev) => !prev);
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
      {!creatingCreditCard ? (
        <div
          className={`w-full h-full overflow-hidden transition-transform duration-300 ${creatingCreditCard ? 'translate-x-full' : 'translate-x-0'}`}>
          <div className="w-full flex flex-row items-center justify-between p-2">
            <h1 className="text-xl font-bold">Seus Cartões</h1>
            <Button
              className="bg-green-500 h-fit px-2 py-2 text-white"
              onClick={toggleCreatingCreditCard}>
              {PlusIcon(8)}
            </Button>
          </div>
          <div className="w-full h-[80%] overflow-y-scroll px-2">
            {creditCards.map((creditCard: ICreditCard) => (
              <div
                key={creditCard.id}
                className={`relative mt-2 rounded-3xl rounded-tr-[4.2rem] w-full h-52 p-2 ${creditCard.flag === 'mastercard' && 'bg-red-900'} ${creditCard.flag === 'visa' && 'bg-blue-800'} ${creditCard.flag == 'elo' && 'bg-black'}`}>
                <svg
                  viewBox="0 0 100 100"
                  className="absolute top-0 right-0 w-12 h-12"
                  style={{ transform: 'rotate(-90deg)' }}>
                  <path
                    className="dark:hidden"
                    d="M 100 0 Q 0 0 0 100 L 100 100 Z"
                    fill="#F3F4F6"
                  />

                  <path
                    className="dark:flex hidden"
                    d="M 100 0 Q 0 0 0 100 L 100 100 Z"
                    fill="#27272A"
                  />
                </svg>
                <Button
                  onClick={() => handleDeleteCard(creditCard.id)}
                  className="absolute top-1 right-1 text-red-600 p-0">
                  <DeleteIcon fontSize="large" color="inherit" />
                </Button>
                <div className="flex flex-col w-full h-full items-stretch justify-between text-white font-bold text-3xl">
                  <div className="flex flex-row items-center justify-between mt-2">
                    {creditCard.flag === 'visa' && (
                      <Image src={visaLogo} width={80} height={30} alt="Logo visa" />
                    )}
                    {creditCard.flag === 'mastercard' && (
                      <Image src={mastercardLogo} width={80} height={30} alt="Logo mastercard" />
                    )}
                    {creditCard.flag === 'elo' && (
                      <Image src={eloLogo} width={80} height={30} alt="Logo elo" />
                    )}
                    <div className="mr-12 font-normal">**** {creditCard.cardNumber.slice(-4)}</div>
                  </div>
                  <div className="flex flex-row items-center justify-between p-1">
                    <div>
                      <div>{creditCard.nickname}</div>
                      <div className="text-sm font-light">{creditCard.financialInstitution}</div>
                    </div>
                    <div className="font-normal text-2xl">
                      {creditCard.expirationDate.getMonth() + 1}/
                      {creditCard.expirationDate.getFullYear().toString().slice(-2)}
                    </div>
                  </div>
                </div>
              </div>
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
