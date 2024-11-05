import { z } from 'zod';

const minDate = new Date().getMonth() - 1;

export const updateCreditCardItemSchema = z.object({
  amount: z.number().optional(),
  name: z.string().optional(),
  description: z
    .string()
    .max(1000, { message: 'Description is too long' })
    .optional(),
  date: z.date().refine((date) => date.getMonth() >= minDate, {
    message: 'Date cannot be before last month',
  }),
  parcellsNumber: z.number(),
  selectedCategoryId: z.string().min(1, { message: 'Category is required' }),
  selectedSubcategoryId: z.string().optional(),
});
