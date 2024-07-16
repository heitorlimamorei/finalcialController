import { useEffect, useState, ReactElement } from 'react';

import CurrencyInput from '@/components/common/CurrencyInput';

import Button from './common/Button';
import { CurrencyIcon, MinusIcon } from './icons/Icons';

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateItemModal({ isOpen, onClose }: CreateItemModalProps): ReactElement {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  const [selectedType, setSelectedType] = useState('');
  const [transitionType, setTransitionType] = useState('');

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsContainerVisible(true);
      setTimeout(() => setIsModalVisible(true), 100);
    } else {
      setIsModalVisible(false);
      setTimeout(() => setIsContainerVisible(false), 200);
      setSelectedType('');
      setTransitionType('');
    }
  }, [isOpen]);

  const handleButtonClick = (newType: string) => {
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
        onClick={onClose}></div>
      <div
        className={`bg-gray-100 w-full md:w-1/2 h-2/3 transform transition-transform duration-500 ${isModalVisible ? 'translate-y-0' : 'translate-y-full'} rounded-t-xl`}>
        <div className="p-4 relative overflow-hidden h-full">
          {!selectedType && (
            <div
              className={`transition-transform duration-300 ${transitionType === '' ? 'translate-x-0' : 'translate-x-full'}`}>
              <Button
                className="flex flex-row items-center my-2 bg-red-600 w-full p-2 border-2 border-red-600 text-start text-xl font-bold text-white rounded-full hover:bg-red-500"
                onClick={() => handleButtonClick('expense')}>
                <div className="w-[10%] mr-5">{MinusIcon('#FFFFFF', 1)}</div>
                Despesa
              </Button>
              <Button
                className="flex flex-row items-center my-2 bg-green-600 w-full p-2 border-2 border-green-600 text-start text-xl font-bold text-white rounded-full hover:bg-green-500"
                onClick={() => handleButtonClick('income')}>
                <div className="w-[10%] mr-5">{MinusIcon('#FFFFFF', 1)}</div>
                Receita
              </Button>
            </div>
          )}
          {transitionType === 'expense' && (
            <div
              className={`transition-transform duration-300 ${selectedType === 'expense' ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
              <div className="flex flex-col items-center justify-center h-full">
                <CurrencyInput
                  value={value}
                  onChange={setValue}
                  type="expense"
                  className="px-3 py-4 rounded-xl focus:outline-none text-2xl text-center text-white font-bold"
                />
                <Button
                  className="my-2 bg-blue-600 p-2 border-2 border-blue-600 text-white rounded-full hover:bg-blue-500"
                  onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
          {transitionType === 'income' && (
            <div
              className={`transition-transform duration-300 ${selectedType === 'income' ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
              <div className="flex flex-col items-center justify-center h-full">
                <CurrencyInput
                  value={value}
                  onChange={setValue}
                  type="income"
                  className="px-3 py-4 rounded-xl focus:outline-none text-2xl text-center text-white font-bold"
                />
                <Button
                  className="my-2 bg-blue-600 p-2 border-2 border-blue-600 text-white rounded-full hover:bg-blue-500"
                  onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
