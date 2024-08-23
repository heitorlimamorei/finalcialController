'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import { IUser } from '@/types/user';
import AssistantIcon from '@mui/icons-material/Assistant';

import Button from '@/components/common/Button';
import { HomeIcon, ChartIcon, GearIcon, SheetIcon } from '@/components/icons/Icons';
interface NavBarProps {
  selectedButton: string;
  user: IUser;
}

export default function NavBar({ selectedButton, user }: NavBarProps) {
  const router = useRouter();
  const { theme } = useTheme();

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
      <Button
        onClick={() => router.push(`/dashboard?u=${user.id}`)}
        className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${selectedButton === 'home' ? 'dark:bg-blue-700 bg-blue-200' : ''
          }`}>
        {HomeIcon(getIconColor('home'), 8)}
      </Button>

      <Button
        onClick={() => router.push(`/dashboard?u=${user.id}`)}
        className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${selectedButton === 'chart' ? 'dark:bg-blue-700 bg-blue-200' : ''
          }`}>
        {ChartIcon(getIconColor('chart'), 8)}
      </Button>

      <Button
        onClick={() => router.push(`/dashboard?u=${user.id}`)}
        className={
          'flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 bg-blue-500'
        }>
        <AssistantIcon fontSize="large" />
      </Button>

      <Button
        onClick={() => router.push(`/sheet?u=${user.id}`)}
        className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${selectedButton === 'sheet' ? 'dark:bg-blue-700 bg-blue-200' : ''
          }`}>
        {SheetIcon(getIconColor('sheet'), 8)}
      </Button>

      <Button
        onClick={() => router.push(`/config?u=${user.id}`)}
        className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${selectedButton === 'config' ? 'dark:bg-blue-700 bg-blue-200' : ''
          }`}>
        {GearIcon(getIconColor('config'), 8)}
      </Button>
    </nav>
  );
}
