import React, { useState } from 'react';
import { useEffect } from 'react';

import useCategory from '@/hook/useCategory';
import { IAccount } from '@/types/account';
import { ICategory } from '@/types/category';
import { IBackItem } from '@/types/item';
import { IUser } from '@/types/user';
import { firestoreTimestampToDate, formatDate } from '@/utils/datefunctions';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';

import Loading from '../common/Loading';
import DetailedItem from './DetailedItem';

interface IDetailedItemsListProps {
  user: IUser;
  account: IAccount;
  handleOpenUpdateModal: (item: IBackItem) => void;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function DetailedItemsList({
  user,
  account,
  handleOpenUpdateModal,
}: IDetailedItemsListProps) {
  const { data: items } = useSWR<IBackItem[]>(
    `/items?sheetid=${user.personalSpreadSheet}`,
    fetcher,
  );
  if (items === undefined) return null;

  const sortedItems = [...items]
    .sort((a, b) => {
      const dateA = firestoreTimestampToDate(a.date);
      const dateB = firestoreTimestampToDate(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .filter((item) => item.accountId === account!.id);
  return (
    <ul className="">
      {sortedItems.map((item: IBackItem) => (
        <li key={item.id}>
          <DetailedItem
            item={item}
            sheetId={user.personalSpreadSheet}
            handleOpenUpdateModal={handleOpenUpdateModal}
          />
          <span className="h-[2px] w-full flex bg-gray-300"></span>
        </li>
      ))}
    </ul>
  );
}
