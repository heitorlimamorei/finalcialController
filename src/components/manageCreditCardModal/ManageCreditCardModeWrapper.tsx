'use client';

import { useState } from 'react';

import { ICreditCard } from '@/types/creditCard';

import CreateCreditCardForm from './CreateCreditCardForm';
import ListCreditCard from './ListCreditCard';
import UpdateCreditCardForm from './UpdateCreditCardForm';

type RenderModes = 'UPDATE' | 'SHOW' | 'CREATE';

interface IManageCreditCardModeWrapper {
  onClose: () => void;
  currentRenderMode: RenderModes;
  handleRenderModeChange: (c: RenderModes) => void;
  ownerId: string;
}

export default function ManageCreditCardModeWrapper(props: IManageCreditCardModeWrapper) {
  const [currentCreditCard, setCurrentCreditCard] = useState<ICreditCard | null>(null);

  const handleCurrentCreditCardChange = (c: ICreditCard | null) => {
    setCurrentCreditCard(c);
    if (c) props.handleRenderModeChange('UPDATE');
  };

  const handleClose = () => {
    handleCurrentCreditCardChange(null);
    props.onClose();
  };

  if (props.currentRenderMode == 'UPDATE') {
    if (!currentCreditCard) return 'ERROR TO UPDATE';
    return (
      <UpdateCreditCardForm
        owid={props.ownerId}
        onClose={handleClose}
        currentCard={currentCreditCard}
      />
    );
  }

  if (props.currentRenderMode == 'CREATE') {
    return <CreateCreditCardForm onClose={handleClose} ownerId={props.ownerId} />;
  }

  return (
    <ListCreditCard
      selectCard={handleCurrentCreditCardChange}
      owid={props.ownerId}
      toggleMode={() => props.handleRenderModeChange('CREATE')}
    />
  );
}
