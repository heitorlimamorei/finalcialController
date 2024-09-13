'use client';

import { IAccount } from '@/types/account';
import PersonIcon from '@mui/icons-material/Person';

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
      <div className="p-2">
        <h1 className="text-2xl font-bold">Selecione a conta</h1>
        <ul>
          {accounts.map((account: IAccount) => (
            <li
              className="my-2 bg-zinc-700 p-3 text-2xl text-gray-200 dark:text-zinc-700 font-bold border-gray-300 dark:border-gray-600 border-2 rounded-full dark:bg-gray-300 hover:bg-gray-200 cursor-pointer"
              key={account.id}
              onClick={() => {
                onChange(account);
                onClose();
              }}>
              <PersonIcon fontSize="large" className="mr-10" />
              {account.nickname}
            </li>
          ))}
        </ul>
      </div>
    </BaseModal>
  );
}
