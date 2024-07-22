import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

export function useCategory() {
  async function getCategories(sheetId: string) {
    const categories = await axios.get(`${api}/category?sheetId=${sheetId}`);
    return categories.data;
  }

  async function getCategory(sheetId: string, categoryId: string) {
    const category = await axios.get(`${api}/category/${categoryId}?sheetId=${sheetId}`);
    return category.data;
  }

  async function createCategory(
    sheetId: string,
    name: string,
    ownerId: string,
    type: string,
    imagePath: string,
  ) {
    const response = await axios.post(`${api}/category`, {
      sheetId,
      name,
      ownerId,
      type,
      imagePath,
    });
    return response.data;
  }

  async function deleteCategory(sheetId: string, categoryId: string) {
    const resp = await axios.delete(`${api}/category/${categoryId}?sheetId=${sheetId}`);
    if (resp.status !== 200) {
      console.error('Error deleting category');
    }
  }

  return {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
  };
}
