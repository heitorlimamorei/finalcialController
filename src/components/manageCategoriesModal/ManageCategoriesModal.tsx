import { useEffect, useState } from 'react';

import { ICategory } from '@/types/category';
import fetcher from '@/utils/fetcher';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

import BaseModal from '../common/BaseModal';
import Button from '../common/Button';
import CreateCategoryForm from './CreateCategoryForm';

interface IManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalSpreadSheetId: string;
  userId: string;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default function ManageCategoriesModal({
  isOpen,
  onClose,
  personalSpreadSheetId,
  userId,
}: IManageCategoriesModalProps) {
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR<ICategory[]>(`/category?sheetId=${personalSpreadSheetId}`, fetcher);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [creatingCategoryTransition, setCreatingCategoryTransition] = useState(false);
  const [categoryType, setCategoryType] = useState<'category' | 'subcategory'>('category');
  const [mainCategoryId, setMainCategoryId] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCreatingCategory(false);
        setCreatingCategoryTransition(false);
      }, 200);
    }
  }, [isOpen]);

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`${api}/category/${id}?sheetid=${personalSpreadSheetId}`);
      mutate('/category?sheetId=' + personalSpreadSheetId);
    } catch (err) {
      console.error(err);
    }
  };
  const handleClose = () => {
    setMainCategoryId('');
    onClose();
  };

  const handleEnterCreatingAccount = (value: boolean) => {
    if (value !== creatingCategory) {
      setCreatingCategoryTransition(value);
      setTimeout(() => setCreatingCategory(value), 200);
    } else {
      setCreatingCategory(value);
      setTimeout(() => setCreatingCategoryTransition(value), 10);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <div className={'p-3 relative h-full w-full'}>
        {!creatingCategory && (
          <div
            className={`w-full h-full transition-transform duration-300 ${creatingCategoryTransition === false ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="w-full flex flex-row items-center justify-between p-2">
              <h1 className="text-xl font-bold">Categorias</h1>
              <Button
                className="bg-green-500 h-fit px-2 py-2 text-white"
                onClick={() => {
                  setCategoryType('category');
                  handleEnterCreatingAccount(true);
                }}>
                <AddCircleIcon />
              </Button>
            </div>

            <div className="w-full h-[80%] mb-5 overflow-y-scroll">
              {categories ? (
                categories
                  .filter((category) => category.type === 'category')
                  .map((category: ICategory) => (
                    <div
                      key={category.id}
                      className="flex flex-col items-center justify-between p-5 my-2 rounded-xl">
                      <div className="w-full flex flex-row items-center justify-between border-2 border-gray-500 p-5 rounded-xl">
                        <h1 className="text-xl font-bold">{category.name}</h1>
                        <Button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-1 text-red-400 border-2 border-gray-400">
                          <DeleteOutlineIcon />
                        </Button>
                      </div>
                      <div className="flex flex-col w-[95%] h-fit px-5 border-2 border-gray-500 border-t-0 rounded-xl rounded-t-none">
                        <div className="w-full flex flex-row justify-between my-3">
                          <h1 className="font-bold text-lg ">Subcategorias</h1>

                          <Button
                            className="bg-green-500 h-fit px-1 py-1 text-white"
                            onClick={() => {
                              setCategoryType('subcategory');
                              setMainCategoryId(category.id);
                              handleEnterCreatingAccount(true);
                            }}>
                            <AddCircleIcon />
                          </Button>
                        </div>
                        <ul className="mb-2">
                          {categories
                            .filter((subCategory) => subCategory.mainCategoryId === category.id)
                            .map((subCategory: ICategory) => (
                              <li
                                key={subCategory.id}
                                className="w-full flex flex-row items-center justify-between my-2">
                                <h1>{subCategory.name}</h1>
                                <Button
                                  onClick={() => handleDeleteCategory(subCategory.id)}
                                  className="p-1 text-red-400 border-2 border-gray-400">
                                  <DeleteOutlineIcon />
                                </Button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}

        {creatingCategoryTransition && (
          <div
            className={`transition-transform duration-300 w-full h-full ${creatingCategory === true ? 'translate-x-0' : 'translate-x-[-25rem]'}`}>
            <CreateCategoryForm
              ownerId={userId}
              sheetId={personalSpreadSheetId}
              onClose={handleClose}
              type={categoryType}
              mainCategoryId={mainCategoryId}
            />
          </div>
        )}
      </div>
    </BaseModal>
  );
}
