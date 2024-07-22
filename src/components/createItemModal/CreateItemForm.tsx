import { useEffect, type ReactElement, ChangeEvent } from 'react';
import { useState } from 'react';

import { useCategory } from '@/hook/useCategory';
import useItem from '@/hook/useItem';
import { ICategory } from '@/types/category';
import { IUser } from '@/types/user';

import Button from '../common/Button';
import CurrencyInput from '../common/CurrencyInput';
import DateInput from '../common/DateInput';
import TextInput from '../common/TextInput';
import { ItemType } from './CreateItemModal';

interface CreateItemFormProps {
  type: ItemType;
  selectedType: ItemType;
  user: IUser;
  accountId: string;
}

export default function CreateItemForm({
  selectedType,
  type,
  user,
  accountId,
}: CreateItemFormProps): ReactElement {
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');
  const [categories, setCategories] = useState<ICategory[]>([]);

  const { createItem } = useItem();
  const { getCategories } = useCategory();

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

  async function submitItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const categoryId = selectedSubcategoryId ? selectedSubcategoryId : selectedCategoryId;
    try {
      const response = await createItem({
        sheetId: user.personalSheetId,
        categoryId: categoryId,
        ownerId: user.id,
        name,
        description,
        accountId,
        amount,
        date: date.toISOString(),
        type: type.toUpperCase(),
      });
      console.log('Item created successfully:', response);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
    setSelectedSubcategoryId(''); // Reset subcategory when category changes
  };

  const handleChangeSubcategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategoryId(e.target.value);
  };

  return (
    <div
      className={`transition-transform duration-300 w-full h-full ${selectedType === type ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
      <form
        className="flex flex-col items-center justify-start h-full w-full px-3"
        onSubmit={submitItem}>
        <CurrencyInput
          value={amount}
          onChange={setAmount}
          type={type}
          className="w-full h-[10%] rounded-xl focus:outline-none text-2xl text-center text-white font-bold"
        />
        <div className="w-full my-2">
          <label htmlFor="name">Nome</label>
          <TextInput
            className="w-full bg-gray-200 border-gray-300 rounded-xl py-3 px-3"
            placeholder={type == 'INCOME' ? 'Dividendo' : 'Padaria'}
            value={name}
            onChange={handleChangeName}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="description">Descrição</label>
          <TextInput
            className="w-full bg-gray-200 border-gray-300 rounded-xl py-3 px-3"
            placeholder={type == 'INCOME' ? 'Ação Vale' : '5x Pães'}
            value={description}
            onChange={handleChangeDescription}
          />
        </div>

        <div className="w-full my-2 flex flex-col">
          <label htmlFor="date">Data (mm-dd-yyyy)</label>
          <DateInput value={date} onChange={setDate} />
        </div>

        <div className="w-full my-2 flex flex-col">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            className="p-2 rounded-xl bg-gray-200"
            value={selectedCategoryId}
            onChange={handleChangeCategory}>
            <option value="">Selecione</option>
            {categories
              .filter((category) => category.type === 'category')
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {categories.some((category) => category.mainCategoryId === selectedCategoryId) && (
          <div className="w-full my-2 flex flex-col">
            <label htmlFor="subcategory">Subcategoria</label>
            <select
              id="subcategory"
              className="p-2 rounded-xl bg-gray-200"
              value={selectedSubcategoryId}
              onChange={handleChangeSubcategory}>
              <option value="">Selecione</option>
              {categories
                .filter((category) => category.mainCategoryId === selectedCategoryId)
                .map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <Button
          className={`w-full m-2 ${type == 'INCOME' ? 'bg-green-500' : 'bg-red-500'} text-xl font-bold text-white`}
          type="submit">
          Criar Item
        </Button>
      </form>
    </div>
  );
}
