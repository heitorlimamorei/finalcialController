import axios from 'axios';

const api = 'https://financial-controller-backend.onrender.com/api/v1';

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
    const category = await axios.delete(`${api}/category/${categoryId}?sheetId=${sheetId}`);
    return;
  }

  return {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
  };
}
