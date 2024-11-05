import React from 'react';

import ICreditCardItem from '@/types/creditCardItem';

interface DetailedCreditCardItemProps {
  item: ICreditCardItem;
  sheetId: string;
}

export default function DetailedPaidCreditCardItem({ item, sheetId }: DetailedCreditCardItemProps) {
  return (
    <li>
      <h1>{item.name}</h1>
    </li>
  );
}
