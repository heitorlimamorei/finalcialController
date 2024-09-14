'use client';

import { ICreditCard } from '@/types/creditCard';

import BaseModal from '../common/BaseModal';
import CreditCard from '../common/CreditCard';

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
        <ul className="h-[80vh] overflow-y-scroll">
          {creditCards.map((creditCard) => (
            <CreditCard
              key={creditCard.id}
              creditCard={creditCard}
              onClick={() => {
                onChange(creditCard);
                onClose();
              }}
            />
          ))}
        </ul>
      </div>
    </BaseModal>
  );
}
