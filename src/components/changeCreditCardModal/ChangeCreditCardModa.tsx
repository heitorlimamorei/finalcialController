'use client';

import { ICreditCard } from '@/types/creditCard';

import BaseModal from '../common/BaseModal';

interface IChangeCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (account: ICreditCard) => void;
  creditCards: ICreditCard[];
}

export default function ChangeCreditCardModal({
  onChange,
  isOpen,
  onClose,
  creditCards,
}: IChangeCreditCardModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Selecione o cartão</h1>
        <ul>
          {creditCards.map((creditCard) => (
            <li
              className="m-2 p-3 text-2xl font-bold border-gray-300 dark:border-gray-600 border-2 rounded-xl hover:bg-gray-200 cursor-pointer"
              key={creditCard.id}
              onClick={() => {
                onChange(creditCard);
                onClose();
              }}>
              {creditCard.nickname} - {creditCard.cardNumber}
            </li>
          ))}
        </ul>
      </div>
    </BaseModal>
  );
}
