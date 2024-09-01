import { z } from 'zod';

const minDate = new Date(1950, 0, 1);

export const updateItemSchema = z.object({
  amount: z.number().optional(),
  name: z.string().optional(),
  description: z.string().max(1000, { message: 'Description is too long' }).optional(),
  date: z.date().refine((date) => date >= minDate, {
    message: 'Date cannot be before 1950',
  }),
  selectedCategoryId: z.string().min(1, { message: 'Category is required' }),
  selectedSubcategoryId: z.string().optional(),
});
