import ICreditCardItem, { IAPICreditCardItem, INewCreditCardItem } from '@/types/creditCardItem';
import { firestoreTimestampToDate, toggleDateToJson } from '@/utils/datefunctions';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useCreditCardItems(owid: string, creditCardId: string, sheetId: string) {
  const key_url = `/credit_card_items?owid=${owid}&sheetid=${sheetId}&credit_card_id=${creditCardId}`;
  const {
    data: creditCardItems,
    error,
    isLoading,
  } = useSWR<IAPICreditCardItem[]>(key_url, fetcher);

  const sanitizeItem = (c: IAPICreditCardItem): ICreditCardItem => {
    return {
      ...c,
      date: firestoreTimestampToDate(c.date),
    };
  };

  const deleteCreditCardItem = async (itemId: string) => {
    try {
      const resp = await axios.delete(`${api}/credit_card_items/${itemId}?sheetid=${sheetId}`);
      if (resp.status == 200) mutate(key_url);
    } catch (err) {
      console.error('Error deleting credit card item:', err);
    }
  };

  const createCreditCardItem = async (c: INewCreditCardItem) => {
    try {
      const resp = await axios.post(`${api}/credit_card_items`, {
        sheetId: sheetId,
        creditCardId: creditCardId,
        ownerId: c.ownerId,
        name: c.name,
        description: c.description,
        amount: c.amount,
        interest: c.interest,
        parcellsNumber: c.parcellsNumber,
        currentParcell: c.currentParcell,
        categoryId: c.categoryId,
        date: toggleDateToJson(c.date),
      });

      if (resp.status == 201) mutate(key_url);
    } catch (err) {
      console.error('Error creating credit card item:', err);
    }
  };

  const updateCreditCardItem = async (c: ICreditCardItem) => {
    try {
      if (c.updateLocked) throw new Error(`Update of credit card item (id: ${c.id}) is locked`);

      const resp = await axios.put(
        `${api}/credit_card_items/${c.id}?owid=${c.ownerId}&sheetid=${sheetId}&creditCardId=${c.creditCardId}`,
        {
          name: c.name,
          description: c.description,
          amount: c.amount,
          interest: c.interest,
          parcellsNumber: c.parcellsNumber,
          currentParcell: c.currentParcell,
          categoryId: c.categoryId,
          date: toggleDateToJson(c.date),
        },
      );

      if (resp.status == 200) mutate(key_url);
    } catch (err) {
      console.error('Error updating credit card item:', err);
    }
  };

  const creditCardItemsF = creditCardItems?.map(sanitizeItem);

  return {
    creditCardItems: creditCardItems,
    creditCardItemError: error,
    creditCardIsLoading: isLoading,
    updateCreditCardItem,
    createCreditCardItem,
    deleteCreditCardItem,
    creditCardItemsF,
  };
}
