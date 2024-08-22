import React, { useState } from 'react';
import { useEffect } from 'react';

import { IAccount } from '@/types/account';
import { ICategory } from '@/types/category';
import { IBackItem } from '@/types/item';
import { IUser } from '@/types/user';
import { firestoreTimestampToDate, formatDate } from '@/utils/datefunctions';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';

import DetailedItem from './DetailedItem';

interface IDetailedItemsListProps {
  user: IUser;
  account: IAccount;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function DetailedItemsList({ user, account }: IDetailedItemsListProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { data: items } = useSWR<IBackItem[]>(
    `/items?sheetid=${user.personalSpreadSheet}`,
    fetcher,
  );

  useEffect(() => {
    const fetchCategories = async (sheetId: string) => {
      try {
        const categories = await axios.get(`${api}/category?sheetId=${sheetId}`);
        setCategories(categories.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories(user.personalSpreadSheet);
  }, [user.personalSpreadSheet]);
  if (items === undefined) return null;

  const sortedItems = [...items]
    .sort((a, b) => {
      const dateA = firestoreTimestampToDate(a.date);
      const dateB = firestoreTimestampToDate(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .filter((item) => item.accountId === account!.id);
  return (
    <ul className="px-2">
      {sortedItems.map((item: IBackItem) => (
        <li key={item.id}>
          <DetailedItem item={item} categories={categories} />
          <span className="h-[2px] w-full flex bg-gray-300 mt-2"></span>
        </li>
      ))}
    </ul>
  );
}
