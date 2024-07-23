import React, { type ReactElement } from 'react';

import { twMerge } from 'tailwind-merge';
interface TextInputProps {
  className: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  className,
  placeholder,
  value,
  onChange,
}: TextInputProps): ReactElement {
  return (
    <input
      type="text"
      className={twMerge('border-none py-2 px-5 outline-none', className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
