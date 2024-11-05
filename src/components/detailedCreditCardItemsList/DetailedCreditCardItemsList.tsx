import React, { useState } from 'react';

import ICreditCardItem from '@/types/creditCardItem';
import { IUser } from '@/types/user';

import Button from '../common/Button';
import DetailedPaidCreditCardItem from './DetailedPaidCreditCardItem';
import DetailedUnpaidCreditCardItem from './DetailedUnpaidCreditCardItem';

interface IDetailedCreditCardItemsListProps {
  sheetId: string;
  creditCardItems: ICreditCardItem[];
  user: IUser;
}

type ViewType = 'paid' | 'unpaid';

export default function DetailedCreditCardItemsList({
  creditCardItems,
  sheetId,
  user,
}: IDetailedCreditCardItemsListProps) {
  const [selectedView, setSelectedView] = useState<ViewType>('paid');
  console.log(user.id);

  return (
    <div className="w-full h-full flex-col">
      <div className="w-full h-[3%] flex flex-row justify-around">
        <div className="flex flex-col h-full w-fit">
          <Button className="p-0 font-semibold text-lg" onClick={() => setSelectedView('paid')}>
            Pagos
          </Button>
          {selectedView == 'paid' && (
            <div className="w-full h-[2px] dark:bg-gray-200 bg-black rounded-full dark:text-zinc-800 text-gray-200">
              .
            </div>
          )}
        </div>
        <div className="flex flex-col h-full w-fit">
          <Button className="p-0 font-semibold text-lg" onClick={() => setSelectedView('unpaid')}>
            Á pagar
          </Button>
          {selectedView == 'unpaid' && (
            <div className="w-full h-[2px] dark:bg-gray-200 bg-black rounded-full text-gray-200 dark:text-zinc-800">
              .
            </div>
          )}
        </div>
      </div>
      <ul>
        {selectedView == 'paid' &&
          creditCardItems
            .filter((creditCardItem) => creditCardItem.hasBeenPaid === true)
            .map((item) => (
              <DetailedPaidCreditCardItem key={item.id} item={item} sheetId={sheetId} />
            ))}
        {selectedView == 'unpaid' &&
          creditCardItems
            .filter((creditCardItem) => creditCardItem.hasBeenPaid === false)
            .map((item) => (
              <DetailedUnpaidCreditCardItem
                handleOpenUpdateModal={() => {}}
                key={item.id}
                item={item}
                sheetId={sheetId}
                user={user}
              />
            ))}
      </ul>
    </div>
  );
}
