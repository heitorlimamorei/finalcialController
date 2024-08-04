import { INewCategory } from '@/types/category';
import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useCategory() {
  async function createCategory(category: INewCategory) {
    const response = await axios.post(`${api}/category`, category);
    return response.data;
  }
  return { createCategory };
}
