import { type ReactElement } from 'react';

import Button from './common/Button';
import CurrencyInput from './common/CurrencyInput';

interface CreateItemFormProps {
  type: 'expense' | 'income';
  value: number;
  setValue: (value: number) => void;
  selectedType: string;
  onClose: () => void;
}

export default function CreateItemForm({
  value,
  setValue,
  selectedType,
  onClose,
  type,
}: CreateItemFormProps): ReactElement {
  return (
    <div
      className={`transition-transform duration-300 ${selectedType === type ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
      <div className="flex flex-col items-center justify-center h-full">
        <CurrencyInput
          value={value}
          onChange={setValue}
          type={type}
          className="px-3 py-4 rounded-xl focus:outline-none text-2xl text-center text-white font-bold"
        />
        <Button
          className="my-2 bg-blue-600 p-2 border-2 border-blue-600 text-white rounded-full hover:bg-blue-500"
          onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
