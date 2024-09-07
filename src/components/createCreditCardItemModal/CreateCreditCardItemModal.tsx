import { useEffect, useState, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import useCreditCardItems from '@/hook/useCreditCardItems';
import { createCreditCardItemSchema } from '@/schemas/createCreditCardItemSchema';
import { ICategory } from '@/types/category';
import { IUser } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { mutate } from 'swr';
import { z } from 'zod';

import BaseModal from '../common/BaseModal';
import Button from '../common/Button';
import CurrencyInput from '../common/CurrencyInput';
import DateInput from '../common/DateInput';
import FormField from '../common/FormField';
import TextInput from '../common/TextInput';

type CreateCreditCardFormData = z.infer<typeof createCreditCardItemSchema>;

interface CreateCreditCardItemModalProps {
  user: IUser;
  sheetId: string;
  creditCardId: string;
  onClose: () => void;
  isOpen: boolean;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function CreateCreditCardItemModal({
  user,
  sheetId,
  creditCardId,
  isOpen,
  onClose,
}: CreateCreditCardItemModalProps): ReactElement {
  const { createCreditCardItem, creditCardItemError } = useCreditCardItems(
    user.id,
    creditCardId,
    sheetId,
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateCreditCardFormData>({
    resolver: zodResolver(createCreditCardItemSchema),
    defaultValues: {
      date: new Date(),
      parcellsNumber: 0,
      interest: 0,
    },
  });

  const nameValue = watch('name', '');
  const descriptionValue = watch('description', '');
  const amountValue = watch('amount', 0);
  const dateValue = watch('date', new Date());
  const parcellsNumberValue = watch('parcellsNumber', 0);
  const interestValue = watch('interest', 0);
  const selectedCategoryIdValue = watch('selectedCategoryId', '');
  const selectedSubcategoryIdValue = watch('selectedSubcategoryId', '');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api}/category?sheetId=${sheetId}`);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [sheetId]);

  const onSubmit = async (data: CreateCreditCardFormData) => {
    try {
      const response = await createCreditCardItem({
        categoryId: data.selectedCategoryId,
        ownerId: user.id,
        name: data.name,
        description: data.description || '',
        parcellsNumber: data.parcellsNumber,
        interest: data.interest / 100,
        creditCardId: creditCardId,
        currentParcell: 0,
        amount: data.amount,
        date: data.date,
      });

      onClose();
      mutate(`/credit-card?owid=${user.id}`);
      mutate(
        `/credit_card_items?owid=${user.id}&sheetid=${sheetId}&credit_card_id=${creditCardId}`,
      );

      console.log(response);
    } catch (error) {
      console.error('Error creating credit card item:', error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="w-full h-full overflow-y-scroll p-2">
        <form
          className="flex flex-col oveerflow-y-scroll items-center justify-start h-full w-full px-3"
          onSubmit={handleSubmit(onSubmit)}>
          <CurrencyInput
            value={amountValue}
            type="EXPENSE"
            onChange={(value) => setValue('amount', value, { shouldValidate: true })}
            className="w-full h-[10%] rounded-xl focus:outline-none text-2xl text-center text-white font-bold"
          />
          {errors.amount && (
            <p className="text-red-500 font-bold text-lg">{errors.amount.message}</p>
          )}

          <FormField label="Nome">
            <TextInput
              className="w-full"
              placeholder="Nome do Item"
              value={nameValue}
              onChange={(e) => setValue('name', e.target.value, { shouldValidate: true })}
            />
          </FormField>

          <FormField label="Descricão">
            <TextInput
              className="w-full"
              placeholder="Descrição do Item"
              value={descriptionValue || ''}
              onChange={(e) => setValue('description', e.target.value, { shouldValidate: true })}
            />
          </FormField>

          <FormField label="Data">
            <DateInput
              value={dateValue}
              onChange={(date) => setValue('date', date, { shouldValidate: true })}
            />
          </FormField>

          <FormField label="Número de Parcelas">
            <TextInput
              className=""
              value={parcellsNumberValue.toString()}
              onChange={(e) =>
                setValue('parcellsNumber', Number(e.target.value), { shouldValidate: true })
              }
            />
          </FormField>

          <FormField label="Juros (%)">
            <TextInput
              className=""
              value={interestValue.toString()}
              onChange={(e) =>
                setValue('interest', Number(e.target.value), { shouldValidate: true })
              }
            />
          </FormField>

          <FormField label="Categoria">
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
          </FormField>

          {categories.some(
            (category) =>
              category.mainCategoryId === selectedCategoryIdValue &&
              category.type === 'subcategory',
          ) && (
              <FormField label="Subcategoria (opcional)">
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
              </FormField>
            )}
          <Button className="w-full m-2 bg-red-500 text-xl font-bold text-white" type="submit">
            Criar Item
          </Button>
          <span className="bg-transparent text-transparent h-[8rem] w-full">a</span>
        </form>
      </div>
    </BaseModal>
  );
}
