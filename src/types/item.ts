import { firebaseTimesStampType } from './utils.type';

export interface IItem {
  id: string;
  sheetId: string;
  categoryId: string;
  ownerId: string;
  name: string;
  description: string;
  accountId: string;
  amount: number;
  date: firebaseTimesStampType;
  type: string;
}

export interface INewItem {
  sheetId: string;
  categoryId: string;
  ownerId: string;
  name: string;
  description?: string;
  accountId: string;
  amount: number;
  date: string;
  type: string;
}
