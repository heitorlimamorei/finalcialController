'use client';

import { useSearchParams } from 'next/navigation';

import { IUser } from '@/types/user';

import CreditCardItemList from '../CreditCardItemList';
import ItemList from '../ItemList';

interface IRenderItemsWrapper {
  user: IUser;
}

export default function RenderItemsWrapper({ user }: IRenderItemsWrapper) {
  const searchParams = useSearchParams();

  const creditCardId = searchParams.get('creditcard');
  const accountId = searchParams.get('account');

  if (accountId) {
    return <ItemList sheetId={user.personalSpreadSheet} accountId={accountId} />;
  } else if (creditCardId) {
    return (
      <CreditCardItemList
        ownerId={user.id}
        sheetId={user.personalSpreadSheet}
        creditCardId={creditCardId}
      />
    );
  } else {
    return <div>Error: Nenhum ID Account Id ou Credit Card Id foi fornecido</div>;
  }
}
