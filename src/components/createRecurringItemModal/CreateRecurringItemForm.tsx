import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useRecurringItem from '@/hook/useRecurringItem';
import { createRecurringItemSchema } from '@/schemas/creteRecurringItemSchema';
import { ICategory } from '@/types/category';
import { PaymentMethodType } from '@/types/recurringItem';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { z } from 'zod';

import Button from '../common/Button';
import CurrencyInput from '../common/CurrencyInput';
import DateInput from '../common/DateInput';
import TextInput from '../common/TextInput';

type CreateRecurringItemFormData = z.infer<typeof createRecurringItemSchema>;

interface CreateRecurringItemFormProps {
  sheetid: string;
  owid: string;
  paymentMethod: PaymentMethodType;
  paymentMethodId: string;
  onClose: () => void;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function CreateRecurringItemForm(props: CreateRecurringItemFormProps) {
  const { sheetid, owid, paymentMethod, paymentMethodId, onClose } = props;

  const [categories, setCategories] = useState<ICategory[]>([]);
  const { createItem } = useRecurringItem(sheetid);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateRecurringItemFormData>({
    resolver: zodResolver(createRecurringItemSchema),
    defaultValues: {
      startDate: new Date(),
      frequency: 1,
    },
  });

  const nameValue = watch('name', '');
  const descriptionValue = watch('description', '');
  const amountValue = watch('amount', 0);
  const frequencyValue = watch('frequency', 1);
  const startDateValue = watch('startDate', new Date());
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

    fetchCategories(sheetid);
  }, [sheetid]);

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CreateRecurringItemFormData) => {
    const categoryId = data.selectedSubcategoryId
      ? data.selectedSubcategoryId
      : data.selectedCategoryId;

    const validDate = data.startDate || new Date();

    try {
      const response = await createItem({
        sheetId: sheetid,
        categoryId: categoryId,
        owid: owid,
        paymentMethod: paymentMethod,
        paymentMethodId: paymentMethodId,
        name: data.name,
        description: !data.description ? '' : data.description,
        amount: data.amount,
        startDate: validDate.toJSON(),
        frequency: data.frequency,
      });
      handleCloseModal();

      console.log('Recurring Item created successfully:', response);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className={'w-full h-full'}>
      <form
        className="flex flex-col items-center justify-start h-full w-full px-3"
        onSubmit={handleSubmit(onSubmit)}>
        <CurrencyInput
          value={amountValue}
          onChange={(value) => setValue('amount', value, { shouldValidate: true })}
          type={'EXPENSE'}
          className="w-full h-[10%] rounded-xl focus:outline-none text-2xl text-center text-white font-bold"
        />
        {errors.amount && <p className="text-red-500 font-bold text-lg">{errors.amount.message}</p>}

        <div className="w-full my-2">
          <label htmlFor="name" className={errors.name && 'text-red-500 font-bold'}>
            Nome{errors.name && '*'}
          </label>
          <TextInput
            className="w-full"
            placeholder={'Conta de luz'}
            value={nameValue}
            onChange={(e) => setValue('name', e.target.value, { shouldValidate: true })}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="description">Descrição (opcional)</label>
          <TextInput
            className="w-full"
            placeholder={'Conta de luz de casa'}
            value={descriptionValue!}
            onChange={(e) => setValue('description', e.target.value, { shouldValidate: true })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="w-full my-2">
          <label htmlFor="description">Intervalo de cobrança (dias)</label>
          <TextInput
            className="w-full"
            placeholder={'Qtd de dias entre uma cobrança e outra'}
            value={frequencyValue.toString()}
            onChange={(e) =>
              setValue('frequency', parseFloat(e.target.value), {
                shouldValidate: true,
              })
            }
          />
          {errors.frequency && <p>{errors.frequency.message}</p>}
        </div>
        <div className="w-full my-2 flex flex-col">
          <label htmlFor="date" className={errors.startDate && 'text-red-500 font-bold'}>
            Data (mm-dd-yyyy){errors.startDate && '*'}
          </label>
          <DateInput
            value={startDateValue}
            onChange={(date) => setValue('startDate', date, { shouldValidate: true })}
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
              setValue('selectedCategoryId', e.target.value, {
                shouldValidate: true,
              });
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
                setValue('selectedSubcategoryId', e.target.value, {
                  shouldValidate: true,
                })
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

        <Button className={'w-full m-2 bg-red-500 text-xl font-bold text-white'} type="submit">
          Criar Item Recorrente
        </Button>
      </form>
    </div>
  );
}
