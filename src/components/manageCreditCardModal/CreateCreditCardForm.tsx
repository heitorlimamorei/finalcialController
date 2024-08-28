'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

import { createCreditCardSchema } from '@/schemas/createCreditCardSchema';
import { CardBrands, INewCreditCard } from '@/types/creditCard';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '../common/Button';
import FormField from '../common/FormField';
import TextInput from '../common/TextInput';

interface ICreateCreditCardFormProps {
  ownerId: string;
  onClose: () => void;
  onSubmit: (props: INewCreditCard) => Promise<void>;
}
type CreateCreditCardFormData = z.infer<typeof createCreditCardSchema>;

interface ICreateCardZodResp {
  nickname: string;
  cardNumber: string;
  expirationDate: string;
  spendingLimit: number;
  financialInstitution: string;
  flag: string;
}

export default function CreateCreditCardForm({
  ownerId,
  onClose,
  onSubmit,
}: ICreateCreditCardFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateCreditCardFormData>({
    resolver: zodResolver(createCreditCardSchema),
  });

  const nicknameValue = watch('nickname');
  const cardNumberValue = watch('cardNumber');
  const flagValue = watch('flag');
  const expirationDateValue = watch('expirationDate');
  const financialInstitutionValue = watch('financialInstitution');

  const handleCreateCreditCard = async (props: ICreateCardZodResp) => {
    await onSubmit({
      ownerId,
      nickname: props.nickname,
      cardNumber: props.cardNumber,
      flag: props.flag as CardBrands,
      expirationDate: props.expirationDate,
      financialInstitution: props.financialInstitution,
      spendingLimit: props.spendingLimit,
    });
    onClose();
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Crie seu cartão de crédito</h1>
      <form onSubmit={handleSubmit(handleCreateCreditCard)} className="mt-4">
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
          label="Número do cartão"
          error={errors.cardNumber?.message}
          required={!!errors.cardNumber}>
          <TextInput
            {...register('cardNumber')}
            className="w-full p-2 rounded-xl"
            value={cardNumberValue}
            onChange={(e) => setValue('cardNumber', e.target.value, { shouldValidate: true })}
            placeholder="Número do cartão"
          />
        </FormField>
        <FormField label="Bandeira do cartão" error={errors.flag?.message} required={!!errors.flag}>
          <TextInput
            {...register('flag')}
            className="w-full p-2 rounded-xl"
            value={flagValue}
            onChange={(e) => setValue('flag', e.target.value, { shouldValidate: true })}
            placeholder="Bandeira do cartão (mastercard, visa, elo)"
          />
        </FormField>
        <FormField
          label="Instituição financeira"
          error={errors.financialInstitution?.message}
          required={!!errors.financialInstitution}>
          <TextInput
            {...register('financialInstitution')}
            className="w-full p-2 rounded-xl"
            value={financialInstitutionValue}
            onChange={(e) =>
              setValue('financialInstitution', e.target.value, { shouldValidate: true })
            }
            placeholder="banco"
          />
        </FormField>
        <FormField
          label="Data de expiração"
          error={errors.expirationDate?.message}
          required={!!errors.expirationDate}>
          <TextInput
            {...register('expirationDate')}
            className="w-full p-2 rounded-xl"
            value={expirationDateValue}
            onChange={(e) => setValue('expirationDate', e.target.value, { shouldValidate: true })}
            placeholder="MM/YYYY"
          />
        </FormField>

        <Button type="submit" className="bg-green-500 w-full text-xl text-white font-bold mt-5">
          Criar Cartão
        </Button>
      </form>
    </div>
  );
}
