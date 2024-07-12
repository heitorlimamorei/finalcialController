import { type ReactElement } from 'react';

import Button from '@/components/common/Button';

interface QuickMenuButtonProps {
  label: string;
  icon: (color: string, size: number) => ReactElement;
}

export default function QuickMenuButton({ icon, label }: QuickMenuButtonProps) {
  return (
    <Button className="p-5 mb-1 flex flex-col items-center justify-center">
      {icon('#FFFFFF', 2)}
      {label}
    </Button>
  );
}
