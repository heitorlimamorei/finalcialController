import { firebaseTimesStampType } from './utils.type';

export default interface ICreditCardItem {
  id: string;
  categoryId: string;
  ownerId: string;
  name: string;
  description: string;
  amount: number;
  creditCardId: string;
  interest: number;
  parcellsNumber: number;
  currentParcell: number;
  hasBeenPaid: boolean;
  date: Date;
  updateLocked: boolean;
  // eslint-disable-next-line semi
}

export interface IAPICreditCardItem {
  id: string;
  categoryId: string;
  ownerId: string;
  name: string;
  description: string;
  amount: number;
  creditCardId: string;
  interest: number;
  parcellsNumber: number;
  currentParcell: number;
  hasBeenPaid: boolean;
  date: firebaseTimesStampType;
  updateLocked: boolean;
  // eslint-disable-next-line semi
}

export interface INewCreditCardItem {
  categoryId: string;
  ownerId: string;
  name: string;
  description: string;
  amount: number;
  creditCardId: string;
  interest: number;
  parcellsNumber: number;
  currentParcell: number;
  hasBeenPaid: boolean;
  date: Date; // JSON DATE
}
