import React, { useState, useEffect } from 'react';

import { twMerge } from 'tailwind-merge';

import { ItemType } from '../CreateItemModal';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  type: ItemType | undefined;
  className?: string;
}

export default function CurrencyInput({ value, onChange, type, className }: CurrencyInputProps) {
  const [formattedValue, setFormattedValue] = useState<string>('');

  useEffect(() => {
    setFormattedValue(formatCurrency(value));
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    const numericValue = parseInt(inputValue, 10) / 100;
    onChange(numericValue);
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <input
      type="text"
      value={formattedValue}
      onChange={handleChange}
      className={twMerge(
        `border-none ${type == 'income' ? 'bg-green-500' : 'bg-red-500'}`,
        className,
      )}
    />
  );
}
