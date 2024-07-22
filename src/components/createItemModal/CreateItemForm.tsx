import { useState } from 'react';

import { useCategory } from '@/hook/useCategory';
import { ICategory } from '@/types/category';
import { IUser } from '@/types/user';
import axios from 'axios';
import Button from '../common/Button';
import CurrencyInput from '../common/CurrencyInput';
import DateInput from '../common/DateInput';
import TextInput from '../common/TextInput';
import { ItemType } from './CreateItemModal';

interface CreateItemFormProps {
  type: ItemType | undefined;
  selectedType: ItemType | undefined;
  user: IUser;
  accountId: string;
}

const api = 'https://financial-controller-backend.onrender.com/api/v1';
export default function CreateItemForm({
  selectedType,
  type,
  user,
  accountId,
}: CreateItemFormProps): ReactElement {
  const today: Date = new Date();
  const { getCategories } = useCategory();
  // Info needed to create item
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(today);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  // All categories list
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async (sheetId: string) => {
      try {
        const categories: ICategory[] = await getCategories(sheetId);
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories(user.personalSheetId);
  }, [getCategories, user.personalSheetId]);
  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function handleChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }
  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  }

  function handleChangeSubcategory(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedSubcategory(e.target.value);
  }
  return (
    <div
      className={`transition-transform duration-300 w-full h-full ${selectedType === type ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
      <form className="flex flex-col items-center justify-start h-full w-full px-3">
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

        <div className="w-full my-2 flex flex-col">
          <select name="" id="" className="p-2 rounded-xl bg-gray-200"></select>
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            className="p-2 rounded-xl bg-gray-200"
            value={selectedCategory}
            onChange={handleChangeCategory}>
            <option value="">Selecione</option>
            {categories
              .filter((category) => category.mainCategoryId === undefined)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {categories.some((category) => category.mainCategoryId === selectedCategory) && (
          <div className="w-full my-2 flex flex-col">
            <label htmlFor="subcategory">Subcategoria</label>
            <select
              id="subcategory"
              className="p-2 rounded-xl bg-gray-200"
              value={selectedSubcategory}
              onChange={handleChangeSubcategory}>
              <option value="">Selecione</option>
              {categories
                .filter((category) => category.mainCategoryId === selectedCategory)
                .map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <Button
          className={`w-full m-2 ${type == 'income' ? 'bg-green-500' : 'bg-red-500'} text-xl font-bold text-white`}>
          Criar Item
        </Button>
      </form>
    </div>
  );
}
