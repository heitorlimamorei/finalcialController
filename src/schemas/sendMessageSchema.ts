import { z } from 'zod';

export const sendMessageSchema = z.object({
  prompt: z.string().min(10, 'A messagem mínima tem 10 caracteres'),
});
