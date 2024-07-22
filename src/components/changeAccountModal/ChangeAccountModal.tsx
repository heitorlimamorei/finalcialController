'use client';
import { useEffect, useState } from 'react';

import { IAccount } from '@/types/account';
import axios from 'axios';

interface IChangeAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (id: string) => void;
  userId: string;
}
const api = process.env.NEXT_PUBLIC_API_URL;

export default function ChangeAccountModal({
  onChange,
  isOpen,
  onClose,
  userId,
}: IChangeAccountModalProps) {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isContainerVisible, setIsContainerVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsContainerVisible(true);
      setTimeout(() => setIsModalVisible(true), 100);
    } else {
      setIsModalVisible(false);
      setTimeout(() => setIsContainerVisible(false), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchAccounts = async (ownerId: string) => {
      try {
        const response = await axios.get(`${api}/account?owid=${ownerId}`);
        setAccounts(response.data);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };
    if (userId) {
      fetchAccounts(userId);
    }
  }, [userId]);

  return (
    <div
      className={`fixed inset-0 z-0 flex items-end justify-center ${isContainerVisible ? '' : 'hidden'}`}>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ${isModalVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={onClose}></div>
      <div
        className={`bg-gray-100 p-3 w-full md:w-1/2 h-[75%] transform transition-transform duration-500 ${isModalVisible ? 'translate-y-0' : 'translate-y-full'} rounded-t-xl`}>
        <h1 className="text-2xl font-bold">Selecione a conta</h1>
        <ul>
          {accounts.map((account: IAccount) => (
            <li
              className="m-2 p-3 text-2xl font-bold border-black border-2 rounded-xl hover:bg-gray-200 cursor-pointer"
              key={account.id}
              onClick={() => {
                onChange(account.id);
                onClose();
              }}>
              {account.nickname}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
