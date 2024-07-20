export interface ICreditCard {
  nickname: string;
  ownerId: string;
  flag: string;
  spendingLimit: number;
  expires: Date;
  lastNumbers: string;
  financialInstitution: string;
}
