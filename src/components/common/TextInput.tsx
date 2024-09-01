import React from 'react';

import { twMerge } from 'tailwind-merge';
interface TextInputProps {
  className: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ className, placeholder, value, onChange }: TextInputProps) {
  return (
    <input
      type="text"
      className={twMerge(
        'bg-gray-200 border-gray-300 dark:bg-zinc-600 rounded-xl py-3 px-3 ouline-none',
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
