/* eslint-disable semi */
import { firebaseTimesStampType } from './utils.type';

export interface IBackEndRecurringItem {
  id: string;
  name: string;
  description: string;
  amount: number;
  frequency: number; // n days of interval between billing charges
  lastCharge: firebaseTimesStampType;
  nextCharge: firebaseTimesStampType;
  categoryId: string;
  ownerId: string;
  paymentMethod: 'credit-card' | 'account';
  paymentMethodId: string;
}

export interface INewRecurringItem {
  name: string;
  description: string;
  amount: number;
  frequency: number; // n days of interval between billing charges
  startDate: Date;
  paymentMethod: 'credit-card' | 'account';
  paymentMethodId: string;
  categoryId: string;
  owid: string;
  sheetId: string;
}

export default interface IRecurringItem {
  id: string;
  name: string;
  description: string;
  amount: number;
  frequency: number; // n days of interval between billing charges
  lastCharge: Date;
  nextCharge: Date;
  categoryId: string;
  ownerId: string;
  paymentMethod: 'credit-card' | 'account';
  paymentMethodId: string;
}
