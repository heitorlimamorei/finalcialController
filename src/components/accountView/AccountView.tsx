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
import Loading from '../common/Loading';
import { CreateItemModal } from '../createItemModal/CreateItemModal';
import DetailedItemsList from '../detailedItemsList/DetailedItemsList';
import { PlusIcon } from '../icons/Icons';

interface ISheetViewProps {
  accountId?: string;
  user: IUser;
}

export default function AccountView({ accountId, user }: ISheetViewProps) {
  const [isCreateItemOpen, setIsCreateItemOpen] = useState<boolean>(false);

  const { data: account, error: accountError } = useSWR(
    `/account/${accountId}?owid=${user.id}`,
    fetcher,
  );

  if (!account) {
    return <Loading />;
  }

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
        <DetailedItemsList user={user} account={account} />
      </div>
    );
  }
}
