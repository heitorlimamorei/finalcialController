import { useEffect, useState, type ReactElement, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

import { useCategory } from '@/hook/useCategory';
import useItem from '@/hook/useItem';
import { createItemSchema } from '@/schemas/createItemSchema';
import { ICategory } from '@/types/category';
import { IUser } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
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
}

export default function CreateItemForm({
  selectedType,
  type,
  user,
  accountId,
}: CreateItemFormProps): ReactElement {
  const { createItem } = useItem();
  const { getCategories } = useCategory();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateItemFormData>({
    resolver: zodResolver(createItemSchema),
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
        const categories: ICategory[] = await getCategories(sheetId);
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories(user.personalSheetId);
  }, [getCategories, user.personalSheetId]);

  const onSubmit = async (data: CreateItemFormData) => {
    const categoryId = data.selectedSubcategoryId
      ? data.selectedSubcategoryId
      : data.selectedCategoryId;
    try {
      console.log({
        sheetId: user.personalSheetId,
        categoryId: categoryId,
        ownerId: user.id,
        name: data.name,
        description: data.description,
        accountId,
        amount: data.amount,
        date: data.date.toISOString(),
        type: type,
      });
      const response = await createItem({
        sheetId: user.personalSheetId,
        categoryId: categoryId,
        ownerId: user.id,
        name: data.name,
        description: data.description,
        accountId,
        amount: data.amount,
        date: data.date.toISOString(),
        type: type,
      });
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
        {errors.amount && <p>{errors.amount.message}</p>}

        <div className="w-full my-2">
          <label htmlFor="name">Nome</label>
          <TextInput
            className="w-full bg-gray-200 border-gray-300 rounded-xl py-3 px-3"
            placeholder={type === 'INCOME' ? 'Dividendo' : 'Padaria'}
            value={nameValue}
            onChange={(e) => setValue('name', e.target.value, { shouldValidate: true })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="w-full my-2">
          <label htmlFor="description">Descrição</label>
          <TextInput
            className="w-full bg-gray-200 border-gray-300 rounded-xl py-3 px-3"
            placeholder={type === 'INCOME' ? 'Ação Vale' : '5x Pães'}
            value={descriptionValue}
            onChange={(e) => setValue('description', e.target.value, { shouldValidate: true })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="w-full my-2 flex flex-col">
          <label htmlFor="date">Data (mm-dd-yyyy)</label>
          <DateInput
            value={dateValue}
            onChange={(date) => setValue('date', date, { shouldValidate: true })}
          />
          {errors.date && <p>{errors.date.message}</p>}
        </div>

        <div className="w-full my-2 flex flex-col">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            className="p-2 rounded-xl bg-gray-200"
            value={selectedCategoryIdValue}
            {...register('selectedCategoryId')}
            onChange={(e) => {
              setValue('selectedCategoryId', e.target.value, { shouldValidate: true });
              setValue('selectedSubcategoryId', ''); // Reset subcategory when category changes
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

        {categories.some((category) => category.mainCategoryId === selectedCategoryIdValue) && (
          <div className="w-full my-2 flex flex-col">
            <label htmlFor="subcategory">Subcategoria</label>
            <select
              id="subcategory"
              className="p-2 rounded-xl bg-gray-200"
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
