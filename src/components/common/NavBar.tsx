'use client';

import { useRouter } from 'next/navigation';

import { IUser } from '@/types/user';

import Button from '@/components/common/Button';
import { HomeIcon, ChartIcon, GearIcon, SheetIcon } from '@/components/icons/Icons';

interface NavBarProps {
  selectedButton: string;
  user: IUser;
}

export default function NavBar({ selectedButton, user }: NavBarProps) {
  const router = useRouter();
  const navItems = [
    {
      id: 'home',
      icon: HomeIcon,
      path: `/dashboard?u=${user.id}`,
      label: 'Home',
      size: 8,
    },
    {
      id: 'chart',
      icon: ChartIcon,
      path: `/dashboard?u=${user.id}`,
      label: 'Charts',
      size: 8,
    },
    {
      id: 'sheets',
      icon: SheetIcon,
      path: `/dashboard?u=${user.id}`,
      label: 'Sheets',
      size: 8,
    },
    {
      id: 'config',
      icon: GearIcon,
      path: `/config?u=${user.id}`,
      label: 'Config',
      size: 8,
    },
  ];

  return (
    <nav className="fixed z-20 bottom-0 start-0 flex flex-row bg-gray-100 justify-between px-4 h-[8%] w-full shadow-[4px_4px_10px_#000000,-6px_-6px_24px_#ffffff]">
      {navItems.map(({ id, icon, path, label, size }) => (
        <Button
          onClick={() => router.push(path)}
          key={id}
          className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${selectedButton === id ? 'bg-blue-200' : ''
            }`}>
          {icon ? icon(selectedButton === id ? '#0000FF' : '#000000', size) : <div>{label}</div>}
        </Button>
      ))}
    </nav>
  );
}