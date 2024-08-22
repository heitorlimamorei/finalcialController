import React from 'react';
import { useForm } from 'react-hook-form';

import useCategory from '@/hook/useCategory';
import { createCategorySchema } from '@/schemas/createCategorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { mutate } from 'swr';
import { z } from 'zod';

import Button from '../common/Button';
import FormField from '../common/FormField';
import TextInput from '../common/TextInput';

interface ICreateCategoryFormProps {
  sheetId: string;
  ownerId: string;
  type: 'category' | 'subcategory';
  mainCategoryId?: string;
  onClose: () => void;
}
type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

export default function CreateCategoryForm({
  sheetId,
  ownerId,
  type,
  mainCategoryId,
  onClose,
}: ICreateCategoryFormProps) {
  const { createCategory } = useCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
  });

  const nameValue = watch('name');

  const handleCreateAccount = async (data: CreateCategoryFormData) => {
    try {
      await createCategory({
        name: data.name,
        sheetId,
        ownerId,
        type,
        mainCategoryId,
        image_path: 'NIY',
      });
      onClose();
      mutate('/category?sheetId=' + sheetId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">
        Crie sua {type === 'category' ? 'categoria' : 'subcategoria'}
      </h1>
      <form onSubmit={handleSubmit(handleCreateAccount)} className="mt-4">
        <FormField label="Nome da categoria" error={errors.name?.message} required={!!errors.name}>
          <TextInput
            {...register('name')}
            className="w-full p-2 rounded-xl"
            value={nameValue}
            onChange={(e) => setValue('name', e.target.value, { shouldValidate: true })}
            placeholder="Nome"
          />
        </FormField>

        <Button type="submit" className="bg-green-500 w-full text-xl text-white font-bold mt-5">
          Criar categoria
        </Button>
      </form>
    </div>
  );
}
