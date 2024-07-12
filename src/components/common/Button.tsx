import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ComponentProps<'button'> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({ className = '', children, ...restProps }: ButtonProps) {
  return (
    <button className={twMerge('rounded-lg py-5 px-2', className)} {...restProps}>
      {children}
    </button>
  );
}
