import { type ReactElement } from 'react';

import Button from '@/components/common/Button';

interface QuickMenuButtonProps extends React.ComponentProps<'button'> {
  label: string;
  icon: (color: string, size: number) => ReactElement;
  onClick: () => void;
}

export default function QuickMenuButton({ icon, label, onClick }: QuickMenuButtonProps) {
  return (
    <Button className="p-5 mb-1 flex flex-col items-center justify-center" onClick={onClick}>
      {icon('#FFFFFF', 2)}
      {label}
    </Button>
  );
}
