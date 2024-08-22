import React from 'react';

import { ICategory } from '@/types/category';
import { IBackItem } from '@/types/item';
import { firestoreTimestampToDate, formatDate } from '@/utils/datefunctions';

interface IDetailedItemProps {
  item: IBackItem;
  categories: ICategory[];
}

export default function DetailedItem({ item, categories }: IDetailedItemProps) {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Categoria Desconhecida';
  };
  return (
    <div className="flex flex-col w-full h-full h-fit pt-2 border-x-transparent border-t-gray-200 justify-end">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">{item.name}</h1>
          <p className="">{'|' + getCategoryName(item.categoryId)}</p>
        </div>
        <p className="text-gray-500">{formatDate(firestoreTimestampToDate(item.date))}</p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{item.description}</p>
        </div>
        <p
          className={`text-xl font-bold ${item.type === 'INCOME' ? 'text-green-500' : 'text-red-600'}`}>
          R${item.amount}
        </p>
      </div>
    </div>
  );
}
