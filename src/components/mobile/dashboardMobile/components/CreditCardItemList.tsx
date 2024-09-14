import React from 'react';

import useCreditCardItems from '@/hook/useCreditCardItems';
import ICreditCardItem from '@/types/creditCardItem';
import { formatDate } from '@/utils/datefunctions';

import Loading from '@/components/common/Loading';

interface ICreditCardItemListProps {
  ownerId: string;
  creditCardId: string;
  sheetId: string;
}

export default function CreditCardItemList({
  ownerId,
  creditCardId,
  sheetId,
}: ICreditCardItemListProps) {
  const { creditCardItemError, creditCardIsLoading, creditCardItemsF } = useCreditCardItems(
    ownerId,
    creditCardId,
    sheetId,
  );

  if (creditCardItemError) {
    <div>Erro ao carregar items</div>;
  }

  if (creditCardIsLoading || !creditCardItemsF) {
    return <Loading />;
  }

  const sortedItems = [...creditCardItemsF].sort((a, b) => {
    const dateA = a.date;
    const dateB = b.date;
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <ul className="px-2">
      {sortedItems
        .filter((item) => item.creditCardId == creditCardId)
        .map((item: ICreditCardItem) => (
          <li
            key={item.id}
            className="h-[5rem] border-x-transparent border-t-gray-200 flex flex-col justify-end">
            <div className="flex flex-row justify-between items-center h-full">
              <div>
                <h1 className="text-xl font-semibold">{item.name}</h1>
                <p className="text-gray-500">{formatDate(item.date)}</p>
              </div>
              <div className="flex items-center">
                <p className={'text-xl font-bold text-red-600'}>R${item.amount}</p>
              </div>
            </div>
            <span className="h-[2px] w-full flex bg-gray-300"></span>
          </li>
        ))}
    </ul>
  );
}
