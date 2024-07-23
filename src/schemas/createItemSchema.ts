import { z } from 'zod';

const minDate = new Date(1950, 0, 1);

export const createItemSchema = z.object({
  amount: z
    .number()
    .min(0, { message: 'Amount must be a positive number' })
    .max(100000000, { message: 'Amount is too large' }),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z
    .string()
    .max(1000, { message: 'Description is too big' })
    .optional(),
  date: z.date().refine((date) => date >= minDate, {
    message: 'Date cannot be before 1950',
  }),
  selectedCategoryId: z.string().min(1, { message: 'Category is required' }),
  selectedSubcategoryId: z.string().optional(),
});
