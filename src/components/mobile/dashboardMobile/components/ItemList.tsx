import { useEffect, useState } from 'react';

import useItem from '@/hook/useItem';
import { IItem } from '@/types/item';
import { formatDate } from '@/utils/datefunctions';
interface ItemListProps {
  sheetId: string;
}

export default function ItemList({ sheetId }: ItemListProps) {
  const [sheetItems, setSheetItems] = useState<IItem[]>([]);
  const { getItems } = useItem();
  useEffect(() => {
    try {
      const fetchSheet = async (sheetId: string) => {
        const resp = await getItems(sheetId);
        setSheetItems(resp);
      };
      if (sheetId) {
        fetchSheet(sheetId);
      }
    } catch (error) {
      console.log(error);
    }
  }, [getItems, sheetId]);
  return (
    <ul>
      {sheetItems.map((item: IItem) => (
        <li
          key={item.id}
          className="h-[5rem] border-x-transparent border-t-gray-200 flex flex-col justify-end">
          <div className="flex flex-row justify-between items-center h-full">
            <div>
              <h1 className="text-xl font-semibold">{item.name}</h1>
              <p className="text-gray-500">{formatDate(item.date)}</p>
            </div>
            <div className="flex items-center">
              <p
                className={`text-xl font-bold ${item.type === 'INCOME' ? 'text-green-500' : 'text-red-600'}`}>
                R${item.amount > 0 ? item.amount : item.amount * -1}
              </p>
            </div>
          </div>
          <span className="h-[2px] w-full flex bg-gray-300"></span>
        </li>
      ))}
    </ul>
  );
}
