import {
  IAPICreditCard,
  ICreditCard,
  INewCreditCard,
} from '@/types/creditCard';
import { firestoreTimestampToDate } from '@/utils/datefunctions';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useCreditCard(owid: string) {
  const {
    data: creditCardRaw,
    isLoading: isLoadingCreditCards,
    error: creditCardError,
  } = useSWR<IAPICreditCard[]>(`/credit-card?owid=${owid}`, fetcher);

  const sanitizeCreditCard = (c: IAPICreditCard): ICreditCard => {
    return {
      ...c,
      expirationDate: firestoreTimestampToDate(c.expirationDate),
      lastBill: c?.lastBill ? firestoreTimestampToDate(c.lastBill) : null,
    };
  };

  async function handleDeleteCard(id: string) {
    try {
      const response = await axios.delete(
        `${api}/credit-card/${id}?owid=${owid}`,
      );
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

  const creditCards = creditCardRaw?.map(sanitizeCreditCard);

  return {
    creditCards,
    isLoadingCreditCards,
    creditCardError,
    handleDeleteCard,
    handleCreateCreditCard,
  };
}
