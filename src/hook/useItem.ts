import { IBackItem, INewItem, IItem } from '@/types/item';
import { firestoreTimestampToDate } from '@/utils/datefunctions';
import axios from 'axios';

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
  async function deleteItem(id: number) {
    const response = await axios.delete(`${api}/items/${id}`);
    return response.data;
  }
  return { getItems, createItem, deleteItem };
}
