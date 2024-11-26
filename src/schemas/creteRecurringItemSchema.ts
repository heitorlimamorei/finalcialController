import { z } from 'zod';

export const createRecurringItemSchema = z.object({
  amount: z
    .number()
    .min(0, { message: 'Amount must be a positive number' })
    .max(100000000, { message: 'Amount is too large' }),
  frequency: z
    .number({ message: 'Frequency is required' })
    .min(1, { message: 'Minimum frequency is one day' }),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().max(1000, { message: 'Description is too big' }).optional(),
  selectedCategoryId: z.string().min(1, { message: 'Category is required' }),
  selectedSubcategoryId: z.string().optional(),
  startDate: z.date(),
});
