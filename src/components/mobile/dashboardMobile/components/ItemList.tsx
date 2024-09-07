import useCreditCardItems from '@/hook/useCreditCardItems';
import useItem from '@/hook/useItem';
import ICreditCardItem, { IAPICreditCardItem } from '@/types/creditCardItem';
import { IBackItem, IItem } from '@/types/item';
import { firestoreTimestampToDate, formatDate } from '@/utils/datefunctions';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

interface ItemListProps {
  ownerId: string;
  sheetId: string;
  accountId?: string;
  creditCardId?: string;
}

export default function ItemList({ sheetId, accountId, ownerId, creditCardId }: ItemListProps) {
  const { items = [], itemIsLoading } = useItem(sheetId);
  const { creditCardItems = [], creditCardIsLoading } = useCreditCardItems(
    ownerId,
    creditCardId!,
    sheetId,
  );

  if (itemIsLoading || creditCardIsLoading) return <p>Loading...</p>;

  if (!items && !creditCardItems) {
    return <p>aaa</p>;
  }

  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.date;
    const dateB = b.date;
    return dateB.getTime() - dateA.getTime();
  });

  const sortedCreditCardItems = [...creditCardItems!].sort((a, b) => {
    const dateA = firestoreTimestampToDate(a.date);
    const dateB = firestoreTimestampToDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <ul className="px-2">
      {accountId &&
        sortedItems
          .filter((item) => item.accountId == accountId)
          .map((item: IItem) => (
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
      {creditCardId &&
        sortedCreditCardItems
          .filter((item) => item.creditCardId == creditCardId)
          .map((item: IAPICreditCardItem) => (
            <li
              key={item.id}
              className="h-[5rem] border-x-transparent border-t-gray-200 flex flex-col justify-end">
              <div className="flex flex-row justify-between items-center h-full">
                <div>
                  <h1 className="text-xl font-semibold">{item.name}</h1>
                  <p className="text-gray-500">{formatDate(firestoreTimestampToDate(item.date))}</p>
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
