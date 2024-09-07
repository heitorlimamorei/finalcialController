import useItem from '@/hook/useItem';
import { IBackItem, IItem } from '@/types/item';
import { firestoreTimestampToDate, formatDate } from '@/utils/datefunctions';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

interface ItemListProps {
  sheetId: string;
  accountId?: string;
  creditCardId?: string;
}

export default function ItemList({ sheetId, accountId }: ItemListProps) {
  const { items, itemError, itemIsLoading } = useItem(sheetId);

  if (itemIsLoading) return <p>Loading...</p>;

  if (itemError) return <p></p>;

  if (items != undefined) {
    const sortedItems = [...items].sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      return dateB.getTime() - dateA.getTime();
    });

    return (
      <ul className="px-2">
        {sortedItems.map((item: IItem) => (
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
                  R${item.amount}
                </p>
              </div>
            </div>
            <span className="h-[2px] w-full flex bg-gray-300"></span>
          </li>
        ))}
      </ul>
    );
  }
}
