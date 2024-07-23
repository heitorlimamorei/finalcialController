'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { IUser } from '@/types/user';

interface IConfigProfileProps {
  user: IUser;
}

export function ConfigProfile({ user }: IConfigProfileProps) {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-row h-[20%] w-full items-center justify-center">
        <Image
          src={session.user.image}
          className="rounded-full"
          alt="Profile picture"
          width={100}
          height={100}
        />
        <div className="h-full w-fit flex flex-col justify-center px-5">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>
    );
  }
}
