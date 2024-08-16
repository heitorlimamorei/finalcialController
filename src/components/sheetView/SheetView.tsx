import React, { useEffect, useState } from 'react';

import { IAccount } from '@/types/account';
import { ICategory } from '@/types/category';
import { ICreditCard } from '@/types/creditCard';
import { IBackItem } from '@/types/item';
import { IUser } from '@/types/user';
import { firestoreTimestampToDate, formatDate } from '@/utils/datefunctions';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';

import Button from '../common/Button';
import { CreateItemModal } from '../createItemModal/CreateItemModal';
import { PlusIcon } from '../icons/Icons';

interface ISheetViewProps {
  accountId?: string;
  user: IUser;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function AccountView({ accountId, user }: ISheetViewProps) {
  const [isCreateItemOpen, setIsCreateItemOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const { data: account, error: accountError } = useSWR(
    `/account/${accountId}?owid=${user.id}`,
    fetcher,
  );

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

  if (!account) {
    return <div>aa</div>;
  }

  if (!items) {
    return <div>Erro</div>;
  }

  const sortedItems = [...items]
    .sort((a, b) => {
      const dateA = firestoreTimestampToDate(a.date);
      const dateB = firestoreTimestampToDate(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .filter((item) => item.accountId === account!.id);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Categoria Desconhecida';
  };

  const handleCreateItemModal = () => {
    setIsCreateItemOpen((c) => !c);
  };

  if (account) {
    return (
      <div className="bg-gray-100 dark:bg-zinc-800 dark:text-white text-black h-full">
        <CreateItemModal
          user={user}
          accountId={account.id}
          isOpen={isCreateItemOpen}
          onClose={handleCreateItemModal}
        />
        <div className="p-2 flex flex-row justify-between w-full">
          <h1 className="text-2xl font-bold">Sua conta {account.nickname}</h1>
          <Button
            className="bg-green-500 px-2 py-1 text-white text-xl flex flex-row items-center font-semibold justify"
            onClick={handleCreateItemModal}>
            <p className="mr-1">Criar</p>
            {PlusIcon(6)}
          </Button>
        </div>
        <ul className="px-2">
          {sortedItems.map((item: IBackItem) => (
            <li
              key={item.id}
              className="h-fit pt-2 border-x-transparent border-t-gray-200 flex flex-col justify-end">
              <div className="flex flex-col w-full h-full">
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
              <span className="h-[2px] w-full flex bg-gray-300 mt-2"></span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
