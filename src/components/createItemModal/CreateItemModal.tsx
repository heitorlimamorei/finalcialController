import { useEffect, useState, ReactElement } from 'react';

import { IUser } from '@/types/user';

import Button from '../common/Button';
import { MinusIcon } from '../icons/Icons';
import CreateItemForm from './CreateItemForm';

interface CreateItemModalProps {
  accountId: string;
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
  changeBalance: (amount: number) => void;
}

export type ItemType = 'EXPENSE' | 'INCOME';

export function CreateItemModal({
  isOpen,
  onClose,
  user,
  accountId,
  changeBalance,
}: CreateItemModalProps): ReactElement {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isContainerVisible, setIsContainerVisible] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<ItemType>();
  const [transitionType, setTransitionType] = useState<ItemType>();

  useEffect(() => {
    if (isOpen) {
      setIsContainerVisible(true);
      setTimeout(() => setIsModalVisible(true), 100);
    } else {
      setIsModalVisible(false);
      setTimeout(() => setIsContainerVisible(false), 200);
      setSelectedType(undefined);
      setTransitionType(undefined);
    }
  }, [isOpen]);

  const handleOnClose = () => {
    if (isOpen) {
      onClose();
    }
  };

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
    <div
      className={`fixed inset-0 z-0 flex items-end justify-center ${isContainerVisible ? '' : 'hidden'}`}>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ${isModalVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleOnClose}></div>
      <div
        className={`bg-gray-100 w-full md:w-1/2 h-[80%] transform transition-transform duration-500 ${isModalVisible ? 'translate-y-0' : 'translate-y-full'} rounded-t-xl`}>
        <div className="p-4 relative overflow-hidden h-full">
          {!selectedType && (
            <div
              className={`transition-transform duration-300 ${transitionType === undefined ? 'translate-x-0' : 'translate-x-full'}`}>
              <Button
                className="flex flex-row items-center my-2 bg-red-600 w-full p-2 border-2 border-red-600 text-start text-xl font-bold text-white rounded-full hover:bg-red-500"
                onClick={() => handleSetTypeChange('EXPENSE')}>
                <div className="w-[10%] mr-5">{MinusIcon('#FFFFFF', 1)}</div>
                Despesa
              </Button>
              <Button
                className="flex flex-row items-center my-2 bg-green-600 w-full p-2 border-2 border-green-600 text-start text-xl font-bold text-white rounded-full hover:bg-green-500"
                onClick={() => handleSetTypeChange('INCOME')}>
                <div className="w-[10%] mr-5">{MinusIcon('#FFFFFF', 1)}</div>
                Receita
              </Button>
            </div>
          )}

          {transitionType && (
            <CreateItemForm
              onClose={onClose}
              changeBalance={changeBalance}
              selectedType={selectedType!}
              user={user}
              type={transitionType}
              accountId={accountId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
