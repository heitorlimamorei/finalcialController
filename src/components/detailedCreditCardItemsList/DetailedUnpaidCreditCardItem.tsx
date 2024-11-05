import React, { useState } from 'react';

import useCategory from '@/hook/useCategory';
import useCreditCardItems from '@/hook/useCreditCardItems';
import { ICategory } from '@/types/category';
import ICreditCardItem from '@/types/creditCardItem';
import { IUser } from '@/types/user';
import { Progress } from '@material-tailwind/react';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';

import Button from '../common/Button';

interface IDetailedUnpaidCreditCardItemProps {
  item: ICreditCardItem;
  sheetId: string;
  user: IUser;
  handleOpenUpdateModal: (item: ICreditCardItem) => void;
}

export default function DetailedUnpaidCreditCardItem({
  item,
  sheetId,
  user,
  handleOpenUpdateModal,
}: IDetailedUnpaidCreditCardItemProps) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [transitionIsOptionsOpen, setTransitionIsOptionsOpen] = useState(false);
  const { findCategoryById } = useCategory(sheetId);
  const category: ICategory | undefined = findCategoryById(item.categoryId);
  const { deleteCreditCardItem } = useCreditCardItems(
    user.id,
    item.creditCardId,
    sheetId,
  );

  const handleDeleteItem = () => {
    deleteCreditCardItem(item.id);
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
    <li
      key={item.id}
      className={
        'w-[100vw] flex flex-row transition-transform duration-100 border-b border-gray-200 justify-between'
      }>
      <div
        onClick={handleIsOptionsOpen}
        className={`flex flex-col ${isOptionsOpen ? 'w-[80%]' : 'w-full'} transition-all duration-100 p-2  `}>
        <div className="flex flex-row w-full">
          <div className="w-[30%]">
            <h1 className="text-xl font-bold">{item.name}</h1>
            <p>
              {category ? `| ${category.name}` : '| Categoria não encontrada'}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-[55%]">
            <Progress
              value={Math.round(
                (item.currentParcell / item.parcellsNumber) * 100,
              )}
              color="blue"
              size="sm"
              className="w-[5rem] h-[0.5rem]"
            />

            <p>
              {item.currentParcell}/{item.parcellsNumber}
            </p>
          </div>

          <div className="text-red-600 font-bold text-lg w-[15%] text-end">
            R${item.amount}
          </div>
        </div>
        <div className="w-full font-light text-gray-500">
          {item.description}
        </div>
      </div>

      <div
        className={`${transitionIsOptionsOpen ? '' : 'hidden'} flex flex-col transition-transform-all duration-200 w-[18%] h-full text-white`}>
        <Button
          className={`w-full h-[3.1rem] bg-blue-500 rounded-none rounded-tl-xl p-0 ${item.updateLocked ? 'hidden' : ''}`}
          onClick={() => handleOpenUpdateModal(item)}>
          <EditIcon fontSize="large" />
        </Button>

        <Button
          className={`w-full ${item.updateLocked ? 'h-[6.2rem] rounded-l-xl rounded-r-none' : 'h-[3.1rem]  rounded-none rounded-bl-xl'} bg-red-500 p-0`}
          onClick={handleDeleteItem}>
          <DeleteSweepIcon fontSize="large" />
        </Button>
      </div>
    </li>
  );
}
