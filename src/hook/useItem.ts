import { IBackItem, INewItem, IItem } from '@/types/item';
import { firestoreTimestampToDate } from '@/utils/datefunctions';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useItem(sheetId: string) {
  const {
    data: itemsRaw,
    error: itemError,
    isLoading: itemIsLoading,
  } = useSWR<IBackItem[]>(`/items?sheetid=${sheetId}`, fetcher);

  let items: IItem[] = [];
  if (!itemIsLoading) {
    items = itemsRaw!.map((item: IBackItem) => ({
      ...item,
      date: firestoreTimestampToDate(item.date),
    }));
  }

  async function createItem(item: INewItem) {
    const response = await axios.post(`${api}/items`, item);
    return response.data;
  }
  async function deleteItem(item: IBackItem, sheetId: string) {
    const response = await axios.delete(
      `${api}/items/${item.id}?sheetid=${sheetId}`,
    );
    mutate(`/items?sheetid=${sheetId}`);
    return response.data;
  }

  async function updateItem(data: any, sheetId: string) {
    await axios.patch(`${api}/items/${data.id}?sheetid=${sheetId}`, data);
    mutate(`/items?sheetid=${sheetId}`);
  }
  return {
    items,
    itemError,
    itemIsLoading,
    createItem,
    deleteItem,
    updateItem,
  };
}
