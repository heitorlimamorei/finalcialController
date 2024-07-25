import { useTheme } from 'next-themes';

import { SunIcon, MoonIcon } from '@/components/icons/Icons';
interface BotaTemaProps {
  ClassName?: string;
}
export default function BotaoTema(props: BotaTemaProps) {
  const { theme, setTheme } = useTheme();
  return theme === 'dark' ? (
    <div
      onClick={() => setTheme('light')}
      className={`
         w-[6rem] h-[3rem] bg-zinc-800 rounded-full flex items-center ${props.ClassName} hover:cursor-pointer 
        `}>
      <div className="dark:bg-[#303030] bg-[#E0E5EC] rounded-full p-1 w-11 h-10 ml-1 flex items-center justify-center">
        <div
          className={`
              flex items-center justify-center 
              text-[#FFE600] w-8 h-8 rounded-full
            `}>
          {MoonIcon(8)}
        </div>
      </div>
      <div
        className={`flex items-center justify-center 
        text-[#00F0FF] w-8 h-8 rounded-full ml-5`}>
        {SunIcon(8)}
      </div>
    </div>
  ) : (
    <div
      onClick={() => setTheme('dark')}
      className={`
       w-[6rem] h-[3rem] bg-gray-100  rounded-full flex items-center ${props.ClassName} hover:cursor-pointer`}>
      <div className={'flex items-center ml-1.5 text-[#5344FF] w-8 h-8 rounded-full'}>
        {MoonIcon(8)}
      </div>
      <div className="dark:bg-[#232323] bg-gray-300 p-1 rounded-full w-11 h-10 ml-5 flex items-center justify-center">
        <div className={'flex items-center justify-center text-[#ff8000] w-8 h-8 rounded-full'}>
          {SunIcon(8)}
        </div>
      </div>
    </div>
  );
}
