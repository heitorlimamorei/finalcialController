'use client';

import { useState } from 'react';

import { IUser } from '@/types/user';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import Loading from '@/components/common/Loading';
import NavBar from '@/components/common/NavBar';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import { ChevronRightIcon } from '@/components/icons/Icons';
import ManageAccountsModal from '@/components/manageAccountsModal/ManageAccountsModal';
import ManageCategoriesModal from '@/components/manageCategoriesModal/ManageCategoriesModal';
import { ConfigProfile } from '@/components/mobile/configMobile/ConfigProfile';

interface IConfigProps {
  searchParams: {
    u: string;
  };
}

export default function Config(props: IConfigProps) {
  const { data: user, isLoading } = useSWR<IUser>(`/user/${props.searchParams.u}`, fetcher);
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  if (isLoading || !user) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col h-screen w-screen justify-between dark:bg-zinc-800 dark:text-white bg-gray-100 text-black overflow-y-scroll">
      <ManageAccountsModal
        isOpen={isAccountsOpen}
        onClose={() => setIsAccountsOpen(false)}
        ownerId={props.searchParams.u}
      />
      <ManageCategoriesModal
        userId={props.searchParams.u}
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        personalSpreadSheetId={user.personalSpreadSheet}
      />
      <div className="flex flex-col h-screen w-screen justify-between dark:bg-zinc-800 dark:text-white bg-gray-100 text-black overflow-y-scroll">
        <ConfigProfile user={user} />
        <div className="w-full h-full">
          <div className="border-t-2 border-y-gray-300 py-5 px-3 flex flex-row items-center justify-between">
            <h1 className=" text-2xl font-semibold ">Tema</h1>
            <ThemeSwitcher />
          </div>

          <div
            className="border-t-2 border-y-gray-300 py-5 px-3 flex flex-row items-center justify-between"
            onClick={() => setIsAccountsOpen(true)}>
            <h1 className=" text-2xl font-semibold ">Contas</h1>
            {ChevronRightIcon(6)}
          </div>
          <div
            className="border-t-2 border-y-gray-300 py-5 px-3 flex flex-row items-center justify-between"
            onClick={() => setIsCategoriesOpen(true)}>
            <h1 className=" text-2xl font-semibold ">Categorias</h1>
            {ChevronRightIcon(6)}
          </div>
        </div>
      </div>
      <NavBar user={user} selectedButton="config" />
    </div>
  );
}
