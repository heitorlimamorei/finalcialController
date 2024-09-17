import { z } from 'zod';

export const updateCreditCardSchema = z.object({
  nickname: z.string({}),
  spendingLimit: z.number().nonnegative({ message: 'Limite não pode ser negativo' }),
  availableLimit: z.number().nonnegative({ message: 'Limite não pode ser negativo' }),
});
