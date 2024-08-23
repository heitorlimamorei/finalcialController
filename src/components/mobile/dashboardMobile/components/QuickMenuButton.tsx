import { type ReactElement } from 'react';

import Button from '@/components/common/Button';

interface QuickMenuButtonProps extends React.ComponentProps<'button'> {
  label: string;
  onClick: () => void;
  children: ReactElement;
}

export default function QuickMenuButton({ label, onClick, children }: QuickMenuButtonProps) {
  return (
    <Button className="p-5 mb-1 flex flex-col items-center justify-center" onClick={onClick}>
      {children}
      {label}
    </Button>
  );
}
