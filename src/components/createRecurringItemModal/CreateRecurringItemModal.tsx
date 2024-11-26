'use client';

import { PaymentMethodType } from '@/types/recurringItem';

import BaseModal from '../common/BaseModal';
import CreateRecurringItemForm from './CreateRecurringItemForm';

interface CreateItemModalProps {
  owid: string;
  sheetid: string;
  paymentMethodId: string;
  paymentMethod: PaymentMethodType;
  isOpen: boolean;
  onClose: () => void;
}

export function CreateRecurringItemModal({
  isOpen,
  onClose,
  owid,
  sheetid,
  paymentMethod,
  paymentMethodId,
}: CreateItemModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 relative overflow-hidden h-full dark:text-white">
        <CreateRecurringItemForm
          sheetid={sheetid}
          owid={owid}
          paymentMethod={paymentMethod}
          paymentMethodId={paymentMethodId}
          onClose={onClose}
        />
      </div>
    </BaseModal>
  );
}
