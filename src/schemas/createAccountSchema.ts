import { z } from 'zod';

export const createAccountSchema = z.object({
  name: z.string().min(1),
  financial_institution: z
    .string()
    .min(1, { message: 'Instituição Financeira é obrigatório' }),
  balance: z
    .number()
    .nonnegative({ message: 'Saldo não pode ser negativo' })
    .default(0)
    .optional(),
});
