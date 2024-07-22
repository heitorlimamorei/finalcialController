import { useState } from 'react';

import { ClockIcon, CurrencyIcon, TransferIcon } from '@/components/icons/Icons';

import QuickMenuButton from './QuickMenuButton';

interface BalanceCardProps {
  openCreateItemModal: () => void;
  openChangeAccountModal: () => void;
}

export default function BalanceCard({
  openCreateItemModal,
  openChangeAccountModal,
}: BalanceCardProps) {
  return (
    <div className="m-4 rounded-2xl bg-[#121826] h-[13rem] text-white">
      <div className="bg-green-500 rounded-2xl h-1/2 flex flex-col items-center justify-center">
        <h1 className="text-center text-lg">Seu balanço total</h1>
        <p className="text-center text-4xl font-bold">R$2000,80</p>
      </div>
      <div className="bg-[#121826] h-1/2 rounded-b-2xl flex flex-row justify-between px-6">
        <QuickMenuButton icon={CurrencyIcon} label="Adicionar" onClick={openCreateItemModal} />
        <QuickMenuButton icon={TransferIcon} label="Alternar" onClick={openChangeAccountModal} />
        <QuickMenuButton icon={ClockIcon} label="Histórico" onClick={openCreateItemModal} />
      </div>
    </div>
  );
}
