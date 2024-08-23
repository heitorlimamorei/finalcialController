import { useEffect, useState, ReactElement } from 'react';

import { IUser } from '@/types/user';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import BaseModal from '../common/BaseModal';
import Button from '../common/Button';
import CreateItemForm from './CreateItemForm';

interface CreateItemModalProps {
  accountId: string;
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}

export type ItemType = 'EXPENSE' | 'INCOME';

export function CreateItemModal({
  isOpen,
  onClose,
  user,
  accountId,
}: CreateItemModalProps): ReactElement {
  const [selectedType, setSelectedType] = useState<ItemType>();
  const [transitionType, setTransitionType] = useState<ItemType>();

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedType(undefined);
        setTransitionType(undefined);
      }, 200);
    }
  }, [isOpen]);

  const handleSetTypeChange = (newType: ItemType) => {
    if (newType !== selectedType) {
      setTransitionType(newType);
      setTimeout(() => setSelectedType(newType), 200);
    } else {
      setSelectedType(newType);
      setTimeout(() => setTransitionType(newType), 10);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 relative overflow-hidden h-full dark:text-white">
        {!selectedType && (
          <div
            className={`transition-transform duration-300 ${transitionType === undefined ? 'translate-x-0' : 'translate-x-full'}`}>
            <Button
              className="flex flex-row items-center my-2 bg-red-600 w-full p-2 border-2 border-red-600 text-start text-xl font-bold text-white rounded-full hover:bg-red-500"
              onClick={() => handleSetTypeChange('EXPENSE')}>
              <div className="w-[10%] mr-5 text-white">
                <RemoveCircleIcon fontSize="large" />
              </div>
              Despesa
            </Button>
            <Button
              className="flex flex-row items-center my-2 bg-green-600 w-full p-2 border-2 border-green-600 text-start text-xl font-bold text-white rounded-full hover:bg-green-500"
              onClick={() => handleSetTypeChange('INCOME')}>
              <div className="w-[10%] mr-5">
                <AddCircleIcon fontSize="large" />
              </div>
              Receita
            </Button>
          </div>
        )}

        {transitionType && (
          <CreateItemForm
            onClose={onClose}
            selectedType={selectedType!}
            user={user}
            type={transitionType}
            accountId={accountId}
          />
        )}
      </div>
    </BaseModal>
  );
}
