import { useEffect, useState } from 'react';

import { IAccount } from '@/types/account';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

import BaseModal from '../common/BaseModal';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { PlusIcon, TrashIcon } from '../icons/Icons';
import CreateAccountForm from './CreateAccountForm';

interface IManageAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerId: string;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function ManageAccountsModal({
  isOpen,
  onClose,
  ownerId,
}: IManageAccountsModalProps) {
  const { data: accounts, isLoading } = useSWR<IAccount[]>(`/account?owid=${ownerId}`, fetcher);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [creatingAccountTransition, setCreatingAccountTransition] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCreatingAccount(false);
        setCreatingAccountTransition(false);
      }, 200);
    }
  }, [isOpen]);

  const handleDeleteAccount = async (id: string) => {
    try {
      const response = await axios.delete(`${api}/account/${id}?owid=${ownerId}`);
      mutate('/account?owid=' + ownerId);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnterCreatingAccount = (value: boolean) => {
    if (value !== creatingAccount) {
      setCreatingAccountTransition(value);
      setTimeout(() => setCreatingAccount(value), 200);
    } else {
      setCreatingAccount(value);
      setTimeout(() => setCreatingAccountTransition(value), 10);
    }
  };
  if (!accounts || isLoading) {
    return (
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <Loading />
      </BaseModal>
    );
  }
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={'p-3 relative '}>
        {!creatingAccount && (
          <div
            className={`w-full h-full overflow-hidden transition-transform duration-300 ${creatingAccountTransition === false ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="w-full flex flex-row items-center justify-between p-2">
              <h1 className="text-xl font-bold">Suas contas</h1>
              <Button
                className="bg-green-500 h-fit px-2 py-2 text-white"
                onClick={() => handleEnterCreatingAccount(true)}>
                {PlusIcon(8)}
              </Button>
            </div>
            <div className="w-full h-full">
              {accounts.map((account: IAccount) => (
                <div
                  key={account.id}
                  className="flex flex-row items-center justify-between border-2 border-gray-500 p-5 my-2 rounded-xl">
                  <h1 className="text-xl font-bold">{account.nickname}</h1>
                  <Button
                    onClick={() => handleDeleteAccount(account.id)}
                    className="p-1 text-red-400 border-2 border-gray-400">
                    {TrashIcon(6)}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {creatingAccountTransition && (
          <div
            className={`transition-transform duration-300 w-full h-full ${creatingAccount === true ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
            <CreateAccountForm onClose={onClose} ownerId={ownerId} />
          </div>
        )}
      </div>
    </BaseModal>
  );
}
