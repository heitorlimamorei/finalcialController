import { ReactElement, ChangeEvent } from 'react';

import { twMerge } from 'tailwind-merge';

interface DateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  className?: string;
}

export default function DateInput({ value, onChange, className }: DateInputProps): ReactElement {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = new Date(event.target.value);
    onChange(newValue);
  };

  const formattedValue = value.toISOString().split('T')[0]; // Convert Date to YYYY-MM-DD format

  return (
    <input
      type="date"
      className={twMerge('bg-gray-200 border-gray-400 p-2 rounded-xl outline-none', className)}
      value={formattedValue}
      onChange={handleChange}
    />
  );
}
