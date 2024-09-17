import React from 'react';

import Image from 'next/image';

import eloLogo from '@/../public/elo-1.svg';
import mastercardLogo from '@/../public/mc_symbol.svg';
import visaLogo from '@/../public/visa.png';
import { ICreditCard } from '@/types/creditCard';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from './Button';

interface ICreditCardProps {
  creditCard: ICreditCard;
  handleDeleteCard?: (id: string) => void;
  onClick?: () => void;
}

export default function CreditCard({ creditCard, handleDeleteCard, onClick }: ICreditCardProps) {
  return (
    <div
      key={creditCard.id}
      className={`${handleDeleteCard ? 'relative my-2 rounded-tr-[4.2rem]' : 'flex'} ${onClick && 'my-2'} rounded-3xl w-full h-52 p-2 ${creditCard.flag === 'mastercard' && 'bg-red-900'} ${creditCard.flag === 'visa' && 'bg-blue-800'} ${creditCard.flag == 'elo' && 'bg-black'}`}
      onClick={onClick}>
      {handleDeleteCard && (
        <>
          <svg
            viewBox="0 0 100 100"
            className="absolute top-0 right-0 w-12 h-12"
            style={{ transform: 'rotate(-90deg)' }}>
            <path className="dark:hidden" d="M 100 0 Q 0 0 0 100 L 100 100 Z" fill="#F3F4F6" />

            <path className="dark:flex hidden" d="M 100 0 Q 0 0 0 100 L 100 100 Z" fill="#27272A" />
          </svg>
          <Button
            onClick={(ev) => {
              ev.stopPropagation();
              handleDeleteCard(creditCard.id);
            }}
            className="absolute top-1 right-1 text-red-600 p-0">
            <DeleteIcon fontSize="large" color="inherit" />
          </Button>
        </>
      )}
      <div className="flex flex-col w-full h-full items-stretch justify-between text-white font-bold text-3xl">
        <div className="flex flex-row items-center justify-between mt-2">
          {creditCard.flag === 'visa' && (
            <Image src={visaLogo} width={80} height={30} alt="Logo visa" />
          )}

          {creditCard.flag === 'mastercard' && (
            <Image src={mastercardLogo} width={80} height={30} alt="Logo mastercard" />
          )}

          {creditCard.flag === 'elo' && (
            <Image src={eloLogo} width={80} height={30} alt="Logo elo" />
          )}

          <div className={`${handleDeleteCard ? 'mr-12' : ''} font-normal`}>
            **** {creditCard.cardNumber.slice(-4)}
          </div>
        </div>
        {!handleDeleteCard && !onClick && (
          <div className="flex flex-col items-center">
            <span className="text-sm">Limite disponível</span>
            <span className="text-4xl">R${creditCard.availableLimit}</span>
          </div>
        )}

        <div className="flex flex-row items-center justify-between p-1">
          <div>
            <div>{creditCard.nickname}</div>

            <div className="text-sm font-light">{creditCard.financialInstitution}</div>
          </div>

          <div className="font-normal text-2xl">
            {creditCard.expirationDate.getMonth() + 1}/
            {creditCard.expirationDate.getFullYear().toString().slice(-2)}
          </div>
        </div>
      </div>
    </div>
  );
}
