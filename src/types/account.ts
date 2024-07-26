export interface IAccount {
  id: string;
  nickname: string;
  financialInstitution: string;
  balance: number;
  ownerId: string;
}
export interface INewAccount {
  nickname: string;
  financial_institution: string;
  balance: number;
  ownerId: string;
}
