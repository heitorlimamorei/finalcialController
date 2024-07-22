import { IItem, INewItem } from '@/types/item';
import { firestoreTimestampToDate } from '@/utils/datefunctions';
import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useItem() {
  async function createItem(item: INewItem) {
    const response = await axios.post(`${api}/items`, item);
    return response.data;
  }
  async function deleteItem(id: number) {
    const response = await axios.delete(`${api}/items/${id}`);
    return response.data;
  }
  async function updateItem(item: IItem) {
    const response = await axios.put(`${api}/items/${item.id}?sheetId=${item.sheetId}`, {
      ...item,
      date: firestoreTimestampToDate(item.date).toJSON(),
    });
    return response.data;
  }
  return { createItem, deleteItem, updateItem };
}
