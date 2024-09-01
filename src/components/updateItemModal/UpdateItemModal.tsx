import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useItem from '@/hook/useItem';
import { updateItemSchema } from '@/schemas/updateItemSchema';
import { ICategory } from '@/types/category';
import { IBackItem } from '@/types/item';
import { firestoreTimestampToDate } from '@/utils/datefunctions';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { mutate } from 'swr';

import BaseModal from '../common/BaseModal';
import Button from '../common/Button';
import CurrencyInput from '../common/CurrencyInput';
import DateInput from '../common/DateInput';
import Loading from '../common/Loading';
import TextInput from '../common/TextInput';

type UpdateItemFormData = z.infer<typeof updateItemSchema>;

interface IUpdateItemModalProps {
  onClose: () => void;
  isOpen: boolean;
  sheetId: string;
  item: IBackItem;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function UpdateItemModal({ onClose, isOpen, item, sheetId }: IUpdateItemModalProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { updateItem } = useItem();
  const category = categories.find((c) => c.id === item.categoryId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateItemFormData>({
    resolver: zodResolver(updateItemSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  useEffect(() => {
    const fetchCategories = async (sheetId: string) => {
      try {
        const categories = await axios.get(`${api}/category?sheetId=${sheetId}`);
        setCategories(categories.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories(sheetId);

    if (category?.mainCategoryId) {
      setValue('selectedCategoryId', category.mainCategoryId);
      setValue('selectedSubcategoryId', category.id);
    }
    if (!category?.mainCategoryId) {
      setValue('selectedCategoryId', item.categoryId);
      setValue('selectedSubcategoryId', '');
    }
  }, []);

  const nameValue = watch('name', item.name);
  const descriptionValue = watch('description', item.description);
  const amountValue = watch('amount', item.amount);
  const dateValue = watch('date', new Date());
  const selectedCategoryIdValue = watch('selectedCategoryId', '');
  const selectedSubcategoryIdValue = watch('selectedSubcategoryId', '');

  const onSubmit = async (data: UpdateItemFormData) => {
    const categoryId = data.selectedSubcategoryId
      ? data.selectedSubcategoryId
      : data.selectedCategoryId;

    const validDate = data.date || new Date();

    try {
      const response = await updateItem(
        {
          id: item.id,
          sheetId: sheetId,
          categoryId: categoryId,
          ownerId: item.ownerId,
          name: data.name ? data.name : item.name,
          description: !data.description ? '' : data.description,
          accountId: item.accountId,
          amount: data.amount ? data.amount : item.amount,
          date: validDate.toISOString(),
          type: item.type,
        },
        sheetId,
      );
      onClose();

      mutate(`/account?owid=${item.ownerId}`);
      mutate(`/items?sheetid=${sheetId}`);

      console.log('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <form
        className="flex flex-col items-center justify-start h-full w-full p-3"
        onSubmit={handleSubmit(onSubmit)}>
        <CurrencyInput
          value={amountValue}
          onChange={(value) => setValue('amount', value, { shouldValidate: true })}
          type={item.type}
          className="w-full h-[10%] rounded-xl focus:outline-none text-2xl text-center text-white font-bold"
        />
        {errors.amount && <p className="text-red-500 font-bold text-lg">{errors.amount.message}</p>}

        <div className="w-full my-2">
          <label htmlFor="name" className={errors.name && 'text-red-500 font-bold'}>
            Nome{errors.name && '*'}
          </label>
          <TextInput
            className="w-full"
            value={nameValue}
            onChange={(e) => setValue('name', e.target.value, { shouldValidate: true })}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="description">Descrição (opcional)</label>
          <TextInput
            className="w-full"
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
          className={`w-full m-2 ${item.type === 'INCOME' ? 'bg-green-500' : 'bg-red-500'} text-xl font-bold text-white`}
          type="submit">
          Salvar alterações
        </Button>
      </form>
    </BaseModal>
  );
}
