import { ICategory, INewCategory } from '@/types/category';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useCategory(sheetId: string) {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useSWR<ICategory[]>(`/category?sheetId=${sheetId}`, fetcher);

  async function createCategory(category: INewCategory) {
    const response = await axios.post(`${api}/category`, category);
    return response.data;
  }

  const findCategoryById = (id: string): ICategory | undefined => {
    return categories?.find((c) => c.id === id);
  };

  return {
    categories,
    isLoadingCategories,
    categoriesError,
    createCategory,
    findCategoryById,
  };
}
