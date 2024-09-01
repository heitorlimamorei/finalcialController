import { IBackItem, INewItem, IItem } from '@/types/item';
import { firestoreTimestampToDate } from '@/utils/datefunctions';
import axios from 'axios';
import { mutate } from 'swr';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useItem() {
  async function getItems(sheetId: string) {
    const response = await axios.get(`${api}/items?sheetid=${sheetId}`);
    console.log('fetched items');

    const items: IItem[] = response.data.map((item: IBackItem) => ({
      ...item,
      date: firestoreTimestampToDate(item.date),
    }));

    return items;
  }

  async function createItem(item: INewItem) {
    const response = await axios.post(`${api}/items`, item);
    return response.data;
  }
  async function deleteItem(item: IBackItem, sheetId: string) {
    const response = await axios.delete(`${api}/items/${item.id}?sheetid=${sheetId}`);
    mutate(`/items?sheetid=${sheetId}`);
    return response.data;
  }

  async function updateItem(data, sheetId: string) {
    await axios.patch(`${api}/items/${data.id}?sheetid=${sheetId}`, data);
    mutate(`/items?sheetid=${sheetId}`);
  }
  return { getItems, createItem, deleteItem, updateItem };
}
