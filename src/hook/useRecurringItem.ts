import IRecurringItem, { IBackEndRecurringItem, INewRecurringItem } from '@/types/recurringItem';
import { firestoreTimestampToDate } from '@/utils/datefunctions';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useRecurringItem(sheetId: string) {
  const {
    data: itemsRaw,
    error: itemsError,
    isLoading: itemsIsLoading,
  } = useSWR<IBackEndRecurringItem[]>(`/recurring-items?sheetid=${sheetId}`, fetcher);

  let recurringItems: IRecurringItem[] = [];

  if (!itemsIsLoading && itemsRaw) {
    recurringItems = itemsRaw.map((item: IBackEndRecurringItem) => ({
      ...item,
      nextCharge: firestoreTimestampToDate(item.nextCharge),
      lastCharge: firestoreTimestampToDate(item.lastCharge),
    }));
  }

  async function createItem(item: INewRecurringItem) {
    const response = await axios.post(`${api}/recurring-items`, item);
    if (response.status == 201) mutate(`/recurring-items?sheetid=${sheetId}`);
    return response.data;
  }

  async function deleteItem(id: string) {
    const response = await axios.delete(`${api}/recurring-items/${id}?sheetid=${sheetId}`);
    if (response.status == 200) mutate(`/recurring-items?sheetid=${sheetId}`);
    return response.data;
  }

  return {
    recurringItems,
    itemsError,
    itemsIsLoading,
    createItem,
    deleteItem,
  };
}
