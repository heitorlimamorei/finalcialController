'use client';

import { useRouter } from 'next/navigation';

import AssistantIcon from '@mui/icons-material/Assistant';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

import Button from '@/components/common/Button';

interface ChatNavBar {
  selectedButton: string;
  u: string;
  acid?: string;
  cid?: string;
}

export default function ChatNavbar({ selectedButton, u, acid, cid }: ChatNavBar) {
  const router = useRouter();

  const query = `u=${u}${cid ? '&creditcard=' + cid : ''}&${acid ? '&account=' + acid : ''}`;

  return (
    <nav className="flex flex-row dark:bg-zinc-800 bg-gray-100 justify-between px-4 h-[8%] w-full shadow-[4px_4px_10px_#000000,-6px_-6px_24px_#ffffff] dark:shadow-[4px_4px_10px_#ffffff,-6px_-6px_24px_#000000]">
      <Button
        onClick={() => router.push(`/dashboard?${query}`)}
        className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${
          selectedButton === 'home'
            ? 'dark:bg-blue-700 bg-blue-200 dark:text-blue-300 text-blue-700'
            : ''
        }`}>
        <HomeIcon fontSize="large" color="inherit" />
      </Button>

      <Button
        onClick={() => router.push(`/dashboard?${query}`)}
        className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${
          selectedButton === 'chart'
            ? 'dark:bg-blue-700 bg-blue-200 dark:text-blue-300 text-blue-700'
            : ''
        }`}>
        <BarChartIcon fontSize="large" color="inherit" />
      </Button>

      <Button
        onClick={() => router.push(`/ai?${query}`)}
        className={
          'flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 bg-blue-500'
        }>
        <AssistantIcon fontSize="large" />
      </Button>

      <Button
        onClick={() => router.push(`/sheet?u=${u}`)}
        className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${
          selectedButton === 'sheet'
            ? 'dark:bg-blue-700 dark:text-blue-300 bg-blue-400 text-blue-700'
            : ''
        }`}>
        <MenuIcon fontSize="large" color="inherit" />
      </Button>

      <Button
        onClick={() => router.push(`/config?${query}`)}
        className={`flex items-center justify-center w-[13%] my-3 rounded-full transition-all duration-300 ${
          selectedButton === 'config'
            ? 'dark:bg-blue-700 bg-blue-200 dark:text-blue-300 text-blue-700'
            : ''
        }`}>
        <SettingsIcon fontSize="large" color="inherit" />
      </Button>
    </nav>
  );
}