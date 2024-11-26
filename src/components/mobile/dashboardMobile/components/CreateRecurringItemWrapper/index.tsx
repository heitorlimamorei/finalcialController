'use client';

import { useSearchParams } from 'next/navigation';

import { PaymentMethodType } from '@/types/recurringItem';

import { CreateRecurringItemModal } from '@/components/createRecurringItemModal/CreateRecurringItemModal';

interface ICreateRecurringItemWrapper {
  owid: string;
  sheetid: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
}

export default function CreateRecurringItemWrapper(props: ICreateRecurringItemWrapper) {
  const searchParams = useSearchParams();

  const creditCardId = searchParams.get('creditcard');
  const accountId = searchParams.get('account');

  const paymentMethodId = creditCardId ? creditCardId : accountId;
  const paymentMethod: PaymentMethodType | null = creditCardId
    ? 'credit-card'
    : accountId
      ? 'account'
      : null;

  if (!paymentMethod || !paymentMethodId) {
    return <div>Error: Nenhum ID Account Id ou Credit Card Id foi fornecido</div>;
  }

  return (
    <CreateRecurringItemModal
      owid={props.owid}
      sheetid={props.sheetid}
      paymentMethodId={paymentMethodId}
      paymentMethod={paymentMethod}
      isOpen={props.isOpen}
      onClose={props.toggleIsOpen}
    />
  );
}
