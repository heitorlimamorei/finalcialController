export interface ICategory {
  id: string;
  sheetId: string;
  name: string;
  ownerId: string;
  type: string;
  mainCategoryId?: string;
  imagePath: string;
}

export interface INewCategory {
  sheetId: string;
  name: string;
  ownerId: string;
  type: string;
  mainCategoryId?: string;
  image_path: string;
}
