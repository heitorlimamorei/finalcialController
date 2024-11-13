import { IAPICreditCard } from '@/types/creditCard';

import { firestoreTimestampToDate } from './datefunctions';

export function sanitizeCreditCard(c: IAPICreditCard) {
  return {
    ...c,
    expirationDate: firestoreTimestampToDate(c.expirationDate),
    lastBill: c?.lastBill ? firestoreTimestampToDate(c.lastBill) : null,
  };
}
