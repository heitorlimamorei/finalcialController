import { IItem } from '@/types/item';
import axios from 'axios';

const api = 'https://financial-controller-backend.onrender.com/api/v1';

export default function useItem() {
  async function createItem(item: IItem) {
    const response = await axios.post(`${api}/items`, item);
    return response.data;
  }
  async function deleteItem(id: number) {
    const response = await axios.delete(`${api}/items/${id}`);
    return response.data;
  }
  async function updateItem(item: IItem) {
    const response = await axios.put(`${api}/items/${item.id}?sheetId=${item.sheetId}`, item);
    return response.data;
  }
  return { createItem, deleteItem, updateItem };
}
