import { useForm } from 'react-hook-form';

import useAccount from '@/hook/useAccount';
import { createAccountSchema } from '@/schemas/createAccountSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { mutate } from 'swr';
import { z } from 'zod';

import Button from '../common/Button';
import FormField from '../common/FormField';
import TextInput from '../common/TextInput';

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

interface ICreateAccountProps {
  ownerId: string;
  onClose: () => void;
}

export default function CreateAccountForm({ ownerId, onClose }: ICreateAccountProps) {
  const { createAccount } = useAccount(ownerId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
  });

  const nameValue = watch('name');
  const financialInstitutionValue = watch('financial_institution');
  const balanceValue = watch('balance');

  const handleCreateAccount = async (data: CreateAccountFormData) => {
    try {
      await createAccount({
        nickname: data.name,
        financial_institution: data.financial_institution,
        balance: data.balance ?? 0,
        ownerId,
      });
      onClose();
      mutate('/account?owid=' + ownerId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Crie sua conta</h1>
      <form onSubmit={handleSubmit(handleCreateAccount)} className="mt-4">
        <FormField label="Nome da conta" error={errors.name?.message} required={!!errors.name}>
          <TextInput
            {...register('name')}
            className="w-full p-2 rounded-xl"
            value={nameValue}
            onChange={(e) => setValue('name', e.target.value, { shouldValidate: true })}
            placeholder="Nome"
          />
        </FormField>

        <FormField
          label="Nome da instituição financeira"
          error={errors.financial_institution?.message}
          required={!!errors.financial_institution}>
          <TextInput
            {...register('financial_institution')}
            className="w-full p-2 rounded-xl"
            value={financialInstitutionValue}
            onChange={(e) =>
              setValue('financial_institution', e.target.value, { shouldValidate: true })
            }
            placeholder="Instituição financeira"
          />
        </FormField>

        <FormField
          label="Balanço inicial (opcional)"
          error={errors.balance?.message}
          required={!!errors.balance}>
          <input
            {...register('balance', {
              valueAsNumber: true,
            })}
            type="number"
            className="w-full p-2 rounded-xl bg-gray-200 dark:bg-zinc-600"
            value={balanceValue}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setValue('balance', isNaN(value) ? 0 : value, { shouldValidate: true });
            }}
            placeholder="0"
          />
        </FormField>

        <Button type="submit" className="bg-green-500 w-full text-xl text-white font-bold mt-5">
          Criar conta
        </Button>
      </form>
    </div>
  );
}
