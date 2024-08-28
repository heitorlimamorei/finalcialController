import { z } from 'zod';

const isValidCreditCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

export const createCreditCardSchema = z.object({
  nickname: z.string({}),
  cardNumber: z.string({}).superRefine((value: string, ctx) => {
    if (!isValidCreditCardNumber(value)) {
      ctx.addIssue({
        code: 'custom',
        path: [],
        message: 'Número do cartão inválido',
      });
    }
  }),
  expirationDate: z.string({}).transform((value: string, ctx) => {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      ctx.addIssue({
        code: 'invalid_date',
        path: [],
        message: 'Data de expiração inválida',
      });
    }

    return date.toJSON();
  }),
  spendingLimit: z.number().nonnegative({ message: 'Limite não pode ser negativo' }).default(0),
  financialInstitution: z.string({}),
  flag: z.string({}).superRefine((value: string, ctx) => {
    const validBrands = ['visa', 'mastercard', 'elo'];

    if (!validBrands.find((c) => c == value)) {
      ctx.addIssue({
        code: 'custom',
        path: [],
        message: 'Bandeira inválida',
      });
    }
  }),
});
