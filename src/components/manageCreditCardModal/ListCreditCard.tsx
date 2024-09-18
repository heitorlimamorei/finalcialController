'use client';

import useCreditCard from '@/hook/useCreditCard';
import { ICreditCard } from '@/types/creditCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Button from '../common/Button';
import CreditCard from '../common/CreditCard';
import Loading from '../common/Loading';

interface IListCreditCard {
  owid: string;
  selectCard: (card: ICreditCard) => void;
  toggleMode: () => void;
}

export default function ListCreditCard({ owid, toggleMode, selectCard }: IListCreditCard) {
  const { creditCards, handleDeleteCard, isLoadingCreditCards } = useCreditCard(owid);

  if (!creditCards || isLoadingCreditCards) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between p-2">
        <h1 className="text-xl font-bold">Seus Cartões</h1>
        <Button className="bg-green-500 h-fit text-white p-2" onClick={toggleMode}>
          <AddCircleIcon />
        </Button>
      </div>
      <div className="w-full h-[80%] overflow-y-scroll px-2">
        {creditCards.map((creditCard: ICreditCard) => (
          <CreditCard
            onClick={() => selectCard(creditCard)}
            key={creditCard.id}
            creditCard={creditCard}
            handleDeleteCard={handleDeleteCard}
          />
        ))}
      </div>
    </>
  );
}
