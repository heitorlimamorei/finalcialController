'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useCreditCard from '@/hook/useCreditCard';
import { updateCreditCardSchema } from '@/schemas/updateCreditCardSchema';
import { ICreditCard } from '@/types/creditCard';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '../common/Button';
import CurrencyInput from '../common/CurrencyInput';
import FormField from '../common/FormField';
import TextInput from '../common/TextInput';

interface IUpdateCreditCardFormProps {
  onClose: () => void;
  currentCard: ICreditCard;
  owid: string;
}
type UpdateCreditCardFormData = z.infer<typeof updateCreditCardSchema>;

interface IUpdateCardZodResp {
  nickname: string;
  spendingLimit: number;
  availableLimit: number;
}

export default function UpdateCreditCardForm({
  onClose,
  currentCard,
  owid,
}: IUpdateCreditCardFormProps) {
  const { handleUpdateCreditCard } = useCreditCard(owid);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateCreditCardFormData>({
    resolver: zodResolver(updateCreditCardSchema),
  });

  const nicknameValue = watch('nickname');
  const spendingLimit = watch('spendingLimit');
  const availableLimit = watch('availableLimit');

  useEffect(() => {
    setValue('nickname', currentCard.nickname);
    setValue('spendingLimit', currentCard.spendingLimit);
    setValue('availableLimit', currentCard.availableLimit);
  }, [currentCard]);

  const onSubmit = async (props: IUpdateCardZodResp) => {
    await handleUpdateCreditCard({
      nickname: props.nickname,
      spendingLimit: props.spendingLimit,
      availableLimit: props.availableLimit,
      id: currentCard.id,
      cardNumber: currentCard.cardNumber,
      flag: currentCard.flag,
    });
    onClose();
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-xl font-bold p-1">Crie seu cartão de crédito</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-1 px-1 w-full h-[80%] overflow-y-scroll">
        <FormField
          label="Apelido do cartão"
          error={errors.nickname?.message}
          required={!!errors.nickname}>
          <TextInput
            {...register('nickname')}
            className="w-full p-2 rounded-xl"
            value={nicknameValue}
            onChange={(e) => setValue('nickname', e.target.value, { shouldValidate: true })}
            placeholder="cartão inter"
          />
        </FormField>
        <FormField
          label="Limite do cartão"
          error={errors.spendingLimit?.message}
          required={!!errors.spendingLimit}>
          <CurrencyInput
            type={'EXPENSE'}
            {...register('spendingLimit')}
            className="w-full p-2 rounded-xl  bg-gray-200 dark:bg-zinc-600"
            value={spendingLimit ?? 0}
            onChange={(c) => setValue('spendingLimit', c, { shouldValidate: true })}
          />
        </FormField>
        <FormField
          label="Limite disponivel do cartão"
          error={errors.availableLimit?.message}
          required={!!errors.availableLimit}>
          <CurrencyInput
            type={'EXPENSE'}
            {...register('availableLimit')}
            className="w-full p-2 rounded-xl bg-gray-200 dark:bg-zinc-600"
            value={availableLimit ?? 0}
            onChange={(c) => setValue('availableLimit', c, { shouldValidate: true })}
          />
        </FormField>

        <Button type="submit" className="bg-green-500 w-full text-xl text-white font-bold mt-5">
          Salvar
        </Button>
      </form>
    </div>
  );
}
