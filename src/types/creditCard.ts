import { firebaseTimesStampType } from './utils.type';

export type CardBrands = 'visa' | 'mastercard' | 'elo';

export interface ICreditCard {
  id: string;
  ownerId: string;
  nickname: string;
  cardNumber: string;
  flag: CardBrands;
  expirationDate: Date;
  lastBill?: Date | null;
  financialInstitution: string;
  spendingLimit: number;
  availableLimit: number;
}

export interface IAPICreditCard {
  id: string;
  ownerId: string;
  nickname: string;
  cardNumber: string;
  flag: CardBrands;
  expirationDate: firebaseTimesStampType;
  lastBill?: firebaseTimesStampType;
  financialInstitution: string;
  spendingLimit: number;
  availableLimit: number;
}

export interface INewCreditCard {
  ownerId: string;
  nickname: string;
  cardNumber: string;
  flag: CardBrands;
  expirationDate: string;
  financialInstitution: string;
  spendingLimit: number;
}
