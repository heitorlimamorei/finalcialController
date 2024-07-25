'use client';
import { useEffect, useState } from 'react';

import { IAccount } from '@/types/account';

import BaseModal from '../common/BaseModal';

interface IChangeAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (account: IAccount) => void;
  accounts: IAccount[];
}

export default function ChangeAccountModal({
  onChange,
  isOpen,
  onClose,
  accounts,
}: IChangeAccountModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Selecione a conta</h1>
        <ul>
          {accounts.map((account: IAccount) => (
            <li
              className="m-2 p-3 text-2xl font-bold border-gray-300 dark:border-gray-600 border-2 rounded-xl hover:bg-gray-200 cursor-pointer"
              key={account.id}
              onClick={() => {
                onChange(account);
                onClose();
              }}>
              {account.nickname}
            </li>
          ))}
        </ul>
      </div>
    </BaseModal>
  );
}
