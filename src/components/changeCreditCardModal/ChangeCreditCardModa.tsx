'use client';

import { useSearchParams } from 'next/navigation';

import useCreditCard from '@/hook/useCreditCard';
import { ICreditCard } from '@/types/creditCard';

import BaseModal from '../common/BaseModal';
import CreditCard from '../common/CreditCard';

interface IChangeCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (cid: string) => void;
}

export default function ChangeCreditCardModal({
  onChange,
  isOpen,
  onClose,
}: IChangeCreditCardModalProps) {
  const searchParams = useSearchParams();

  const creditCardId = searchParams.get('creditcard') ?? ' ';
  const userId = searchParams.get('u') ?? ' ';

  const { creditCards, creditCardError, isLoadingCreditCards } = useCreditCard(userId);

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
                onChange(creditCard.id);
                onClose();
              }}
            />
          ))}
        </ul>
      </div>
    </BaseModal>
  );
}
