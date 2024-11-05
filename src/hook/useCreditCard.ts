import {
  IAPICreditCard,
  ICreditCard,
  INewCreditCard,
  IUpdateCreditCardProps,
} from '@/types/creditCard';
import { firestoreTimestampToDate } from '@/utils/datefunctions';
import fetcher, { parseError } from '@/utils/fetcher';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useCreditCard(owid: string) {
  const {
    data: creditCardRaw,
    isLoading: isLoadingCreditCards,
    error: creditCardError,
  } = useSWR<IAPICreditCard[]>(`/credit-card?owid=${owid}`, fetcher);

  const errorObj = creditCardError ? parseError(creditCardError.message) : null;
  const loding = errorObj?.statuscode == 404 ? false : isLoadingCreditCards;
  const errorF = errorObj?.statuscode == 404 ? null : errorObj;

  const sanitizeCreditCard = (c: IAPICreditCard[]): ICreditCard[] => {
    return c.map((c) => ({
      ...c,
      expirationDate: firestoreTimestampToDate(c.expirationDate),
      lastBill: c?.lastBill ? firestoreTimestampToDate(c.lastBill) : null,
    }));
  };

  async function handleDeleteCard(id: string) {
    try {
      const response = await axios.delete(`${api}/credit-card/${id}?owid=${owid}`);
      mutate('/credit-card?owid=' + owid);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateCreditCard(newCreditCard: INewCreditCard) {
    try {
      const response = await axios.post(`${api}/credit-card`, newCreditCard);
      mutate('/credit-card?owid=' + owid);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateCreditCard(data: IUpdateCreditCardProps) {
    try {
      const resp = await axios.patch(`${api}/credit-card/${data.id}`, {
        ownerId: owid,
        nickname: data.nickname,
        cardNumber: data.cardNumber,
        flag: data.flag,
        spendingLimit: data.spendingLimit,
        availableLimit: data.availableLimit,
      });
      mutate('/credit-card?owid=' + owid);
    } catch (err) {
      console.error(err);
    }
  }

  const creditCards: ICreditCard[] = creditCardRaw ? sanitizeCreditCard(creditCardRaw) : [];

  return {
    creditCards,
    isLoadingCreditCards: loding,
    creditCardError: errorF,
    handleDeleteCard,
    handleCreateCreditCard,
    handleUpdateCreditCard,
  };
}
