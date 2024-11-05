import { useState } from 'react';

import useCategory from '@/hook/useCategory';
import useItem from '@/hook/useItem';
import { ICategory } from '@/types/category';
import { IBackItem } from '@/types/item';
import { firestoreTimestampToDate, formatDate } from '@/utils/datefunctions';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';

import Button from '../common/Button';

interface IDetailedItemProps {
  item: IBackItem;
  sheetId: string;
  handleOpenUpdateModal: (item: IBackItem) => void;
}

export default function DetailedItem({ item, sheetId, handleOpenUpdateModal }: IDetailedItemProps) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [transitionIsOptionsOpen, setTransitionIsOptionsOpen] = useState(false);

  const { deleteItem } = useItem(sheetId);
  const { findCategoryById } = useCategory(sheetId);

  const category: ICategory | undefined = findCategoryById(item.categoryId);

  const handleDeleteItem = () => {
    deleteItem(item, sheetId);
  };

  const handleIsOptionsOpen = () => {
    if (isOptionsOpen) {
      setTransitionIsOptionsOpen(false);
      setTimeout(() => setIsOptionsOpen(false), 50);
    }
    if (!isOptionsOpen) {
      setIsOptionsOpen(true);
      setTimeout(() => setTransitionIsOptionsOpen(true), 100);
    }
  };

  return (
    <div className="flex flex-row">
      <div
        className={`flex flex-col transition-all duration-100 h-full mx-2 py-2 border-x-transparent border-t-gray-200 justify-end ${isOptionsOpen ? 'w-[80%]' : 'w-full'}`}
        onClick={handleIsOptionsOpen}>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{item.name}</h1>
            <p className="">{category ? `| ${category.name}` : '| Categoria não encontrada'}</p>
          </div>

          <p className="text-gray-500">{formatDate(firestoreTimestampToDate(item.date))}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">{item.description}</p>
          </div>

          <p
            className={`text-xl font-bold ${item.type === 'INCOME' ? 'text-green-500' : 'text-red-600'}`}>
            R${item.amount}
          </p>
        </div>
      </div>

      <div
        className={`${transitionIsOptionsOpen ? '' : 'hidden'} flex flex-col transition-transform-all duration-200 w-[20%] h-full text-white`}>
        <Button
          className="w-full h-[3.1rem] bg-blue-500 rounded-none rounded-tl-xl p-0"
          onClick={() => handleOpenUpdateModal(item)}>
          <EditIcon fontSize="large" />
        </Button>

        <Button
          className="w-full h-[3.1rem] bg-red-500 rounded-none rounded-bl-xl p-0"
          onClick={handleDeleteItem}>
          <DeleteSweepIcon fontSize="large" />
        </Button>
      </div>
    </div>
  );
}
