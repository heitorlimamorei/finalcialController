'use client';

import { useTheme } from 'next-themes';
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
  const { theme } = useTheme();

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
      id: 'sheet',
      icon: SheetIcon,
      path: `/sheet?u=${user.id}`,
      label: 'Sheet',
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

  const getIconColor = (id: string) => {
    if (selectedButton === id) {
      if (theme === 'dark') {
        return '#141B54';
      }
      if (theme === 'light') {
        return '#0000FF';
      }
    }
    return theme === 'dark' ? '#ffffff' : '#000000';
  };

  return (
    <nav className="fixed z-20 bottom-0 start-0 flex flex-row dark:bg-zinc-800 bg-gray-100 justify-between px-4 h-[8%] w-full shadow-[4px_4px_10px_#000000,-6px_-6px_24px_#ffffff] dark:shadow-[4px_4px_10px_#ffffff,-6px_-6px_24px_#000000]">
      {navItems.map(({ id, icon, path, label, size }) => (
        <Button
          key={id}
          onClick={() => router.push(path)}
          className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${
            selectedButton === id ? 'dark:bg-blue-700 bg-blue-200' : ''
          }`}>
          {icon(getIconColor(id), size)}
        </Button>
      ))}
    </nav>
  );
}
