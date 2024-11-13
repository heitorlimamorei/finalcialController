'use client';

import { useSearchParams } from 'next/navigation';

import useAccount from '@/hook/useAccount';
import { IAccount } from '@/types/account';

import BaseModal from '../common/BaseModal';

interface IChangeAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (acid: string) => void;
}

export default function ChangeAccountModal({
  onChange,
  isOpen,
  onClose,
}: IChangeAccountModalProps) {
  const searchParams = useSearchParams();

  const userId = searchParams.get('u') ?? '';

  const { accounts, accountsError, isLoadingAccounts } = useAccount(userId);

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
                onChange(account.id);
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
