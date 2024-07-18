import { type ReactElement } from 'react';
import { useState } from 'react';

import CurrencyInput from './common/CurrencyInput';
import DateInput from './common/DateInput';
import TextInput from './common/TextInput';
import { ItemType } from './CreateItemModal';

interface CreateItemFormProps {
  type: ItemType | undefined;
  selectedType: ItemType | undefined;
}

export default function CreateItemForm({ selectedType, type }: CreateItemFormProps): ReactElement {
  const today: Date = new Date();
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(today);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  return (
    <div
      className={`transition-transform duration-300 w-full h-full ${selectedType === type ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
      <div className="flex flex-col items-center justify-start h-full w-full px-3">
        <CurrencyInput
          value={amount}
          onChange={setAmount}
          type={type}
          className="w-full h-[10%] rounded-xl focus:outline-none text-2xl text-center text-white font-bold"
        />
        <div className="w-full my-2">
          <label htmlFor="">Nome</label>
          <TextInput
            className="w-full bg-gray-200 border-gray-300 rounded-xl py-3 px-3"
            placeholder={type == 'income' ? 'Dividendo' : 'Padaria'}
            value={name}
            onChange={handleChangeName}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="">Descrição</label>
          <TextInput
            className="w-full bg-gray-200 border-gray-300 rounded-xl py-3 px-3"
            placeholder={type == 'income' ? 'Ação Vale' : '5x Pães'}
            value={description}
            onChange={handleChangeDescription}
          />
        </div>
        <div className="w-full my-2 flex flex-col">
          <label htmlFor="date">Data (mm-dd-yyyy)</label>
          <DateInput value={date} onChange={setDate} />
        </div>
      </div>
    </div>
  );
}
