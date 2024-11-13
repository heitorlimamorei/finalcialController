'use client';

import { useSearchParams } from 'next/navigation';

import { IUser } from '@/types/user';

import CreateCreditCardItemModal from '@/components/createCreditCardItemModal/CreateCreditCardItemModal';
import { CreateItemModal } from '@/components/createItemModal/CreateItemModal';

interface ICreateItemWrapper {
  user: IUser;
  toggleIsOpen: () => void;
  isOpen: boolean;
}

export default function CreateItemWrapper({ user, toggleIsOpen, isOpen }: ICreateItemWrapper) {
  const searchParams = useSearchParams();

  const accountId = searchParams.get('account');
  const creditId = searchParams.get('creditcard');

  if (accountId) {
    return (
      <CreateItemModal user={user} isOpen={isOpen} onClose={toggleIsOpen} accountId={accountId} />
    );
  } else if (creditId) {
    return (
      <CreateCreditCardItemModal
        user={user}
        isOpen={isOpen}
        onClose={toggleIsOpen}
        creditCardId={creditId}
      />
    );
  } else {
    return <div>Error: Nenhum ID Account Id ou Credit Card Id foi fornecido</div>;
  }
}
