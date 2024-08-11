import { useEffect, useState, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import useItem from '@/hook/useItem';
import { createItemSchema } from '@/schemas/createItemSchema';
import { ICategory } from '@/types/category';
import { IUser } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { mutate } from 'swr';
import { z } from 'zod';

import Button from '../common/Button';
import CurrencyInput from '../common/CurrencyInput';
import DateInput from '../common/DateInput';
import TextInput from '../common/TextInput';
import { ItemType } from './CreateItemModal';

type CreateItemFormData = z.infer<typeof createItemSchema>;

interface CreateItemFormProps {
  type: ItemType;
  selectedType: ItemType;
  user: IUser;
  accountId: string;
  onClose: () => void;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function CreateItemForm({
  selectedType,
  type,
  user,
  accountId,
  onClose,
}: CreateItemFormProps): ReactElement {
  const { createItem } = useItem();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateItemFormData>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const nameValue = watch('name', '');
  const descriptionValue = watch('description', '');
  const amountValue = watch('amount', 0);
  const dateValue = watch('date', new Date());
  const selectedCategoryIdValue = watch('selectedCategoryId', '');
  const selectedSubcategoryIdValue = watch('selectedSubcategoryId', '');

  useEffect(() => {
    const fetchCategories = async (sheetId: string) => {
      try {
        const categories = await axios.get(`${api}/category?sheetId=${sheetId}`);
        setCategories(categories.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories(user.personalSpreadSheet);
  }, [user.personalSpreadSheet]);

  const onSubmit = async (data: CreateItemFormData) => {
    const categoryId = data.selectedSubcategoryId
      ? data.selectedSubcategoryId
      : data.selectedCategoryId;

    const validDate = data.date || new Date();

    try {
      const response = await createItem({
        sheetId: user.personalSpreadSheet,
        categoryId: categoryId,
        ownerId: user.id,
        name: data.name,
        description: !data.description ? '' : data.description,
        accountId,
        amount: data.amount,
        date: validDate.toISOString(),
        type: type,
      });
      onClose();

      mutate(`/account?owid=${user.id}`);
      mutate(`/items?sheetid=${user.personalSpreadSheet}`);

      console.log('Item created successfully:', response);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div
      className={`transition-transform duration-300 w-full h-full ${selectedType === type ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
      <form
        className="flex flex-col items-center justify-start h-full w-full px-3"
        onSubmit={handleSubmit(onSubmit)}>
        <CurrencyInput
          value={amountValue}
          onChange={(value) => setValue('amount', value, { shouldValidate: true })}
          type={type}
          className="w-full h-[10%] rounded-xl focus:outline-none text-2xl text-center text-white font-bold"
        />
        {errors.amount && <p className="text-red-500 font-bold text-lg">{errors.amount.message}</p>}

        <div className="w-full my-2">
          <label htmlFor="name" className={errors.name && 'text-red-500 font-bold'}>
            Nome{errors.name && '*'}
          </label>
          <TextInput
            className="w-full"
            placeholder={type === 'INCOME' ? 'Dividendo' : 'Padaria'}
            value={nameValue}
            onChange={(e) => setValue('name', e.target.value, { shouldValidate: true })}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="description">Descrição (opcional)</label>
          <TextInput
            className="w-full"
            placeholder={type === 'INCOME' ? 'Ação Vale' : '5x Pães'}
            value={descriptionValue!}
            onChange={(e) => setValue('description', e.target.value, { shouldValidate: true })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="w-full my-2 flex flex-col">
          <label htmlFor="date" className={errors.date && 'text-red-500 font-bold'}>
            Data (mm-dd-yyyy){errors.date && '*'}
          </label>
          <DateInput
            value={dateValue}
            onChange={(date) => setValue('date', date, { shouldValidate: true })}
          />
        </div>

        <div className="w-full my-2 flex flex-col">
          <label
            htmlFor="category"
            className={errors.selectedCategoryId && 'text-red-500 font-bold'}>
            Categoria{errors.selectedCategoryId && '*'}
          </label>
          <select
            id="category"
            className="p-2 rounded-xl dark:bg-zinc-600 bg-gray-200"
            value={selectedCategoryIdValue}
            {...register('selectedCategoryId')}
            onChange={(e) => {
              setValue('selectedCategoryId', e.target.value, { shouldValidate: true });
              setValue('selectedSubcategoryId', '');
            }}>
            <option value="">Selecione</option>
            {categories
              .filter((category) => category.type === 'category')
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          {errors.selectedCategoryId && <p>{errors.selectedCategoryId.message}</p>}
        </div>

        {categories.some(
          (category) =>
            category.mainCategoryId === selectedCategoryIdValue && category.type === 'subcategory',
        ) && (
          <div className="w-full my-2 flex flex-col">
            <label htmlFor="subcategory">Subcategoria (opcional)</label>
            <select
              id="subcategory"
              className="p-2 rounded-xl dark:bg-zinc-600 bg-gray-200"
              value={selectedSubcategoryIdValue}
              {...register('selectedSubcategoryId')}
              onChange={(e) =>
                setValue('selectedSubcategoryId', e.target.value, { shouldValidate: true })
              }>
              <option value="">Selecione</option>
              {categories
                .filter((category) => category.mainCategoryId === selectedCategoryIdValue)
                .map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <Button
          className={`w-full m-2 ${type === 'INCOME' ? 'bg-green-500' : 'bg-red-500'} text-xl font-bold text-white`}
          type="submit">
          Criar Item
        </Button>
      </form>
    </div>
  );
}
