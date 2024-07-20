import { useState } from 'react';

import { CreateItemModal } from '@/components/createItemModal/CreateItemModal';
import { Sheet } from '@/components/sheetMock';

import BalanceCard from './components/BalanceCard';

export default function DashboardMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateItem = () => {
    setIsOpen((c) => !c);
  };

  return (
    <div className="w-full h-[90%]">
      <CreateItemModal isOpen={isOpen} onClose={handleCreateItem} />
      <BalanceCard createItem={handleCreateItem} />
      <div className="h-[70%] overflow-y-hidden py-2 px-4">
        <h1 className="font-bold text-3xl">Últimas atividades</h1>
        <ul>
          {Sheet.map((item: any) => (
            <li
              key={item.id}
              className="h-[5rem] border-x-transparent border-t-gray-200 flex flex-col justify-end">
              <div className="flex flex-row justify-between items-center h-full">
                <div>
                  <h1 className="text-xl font-semibold">{item.name}</h1>
                  <p className="text-gray-500">30/06/2023</p>
                </div>
                <div className="flex items-center">
                  <p
                    className={`text-xl font-bold ${item.value > 0 ? 'text-green-500' : 'text-red-600'}`}>
                    R${item.value > 0 ? item.value : item.value * -1}
                  </p>
                </div>
              </div>
              <span className="h-[2px] w-full flex bg-gray-300"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
