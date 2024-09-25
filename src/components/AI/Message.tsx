'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import AsssitantLogo from '../../../public/assistant-logo.png';

interface IMessage {
  role: 'user' | 'assistant';
  display: React.ReactNode; // as a content
}

export default function Message({ role, display }: IMessage) {
  const session = useSession();

  const name = session.data?.user?.name;
  const userImg = session.data?.user?.image;

  return (
    <li className="flex flex-col w-full px-3 mt-7 break-all">
      <div className="flex flex-row">
        <Image
          width={30}
          height={30}
          alt="Ai logo"
          src={role === 'assistant' ? AsssitantLogo : userImg!}
          className="mr-5 rounded-full"
        />
        <div className="font-bold self-center bg-transparent">
          {role === 'assistant' ? 'Assistant' : name}
        </div>
      </div>
      <div className="mt-2 ml-[3rem] text-sm mx-2">
        <p className="mt-3 text-[1rem]">
          <>{display}</>
        </p>
      </div>
    </li>
  );
}
