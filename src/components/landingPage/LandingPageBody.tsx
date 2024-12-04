'use client';

import { useState, useCallback, useEffect } from 'react';

import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IUser } from '@/types/user';
import axios from 'axios';

import Button from '@/components/common/Button';

import Loading from '../common/Loading';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function LandingPageBody() {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    await signIn('auth0');
  }, []);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.email) return;

    const fetchData = async () => {
      try {
        const { data: user }: { data: IUser } = await axios.get(
          `${api}/user?email=${session.user?.email}`,
        );
        if (user?.email) {
          router.push(`/dashboard?u=${user.id}`);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          router.push('/userform');
        } else {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, [session, status, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-[90%] flex-col md:flex-row items-center justify-between">
      <div className="h-[30%] p-4 md:hidden">
        <h1 className="text-4xl font-bold">Tome controle das suas finanças!</h1>
        <p className="font-semibold">
          Rastreie, gerencie e otimize seus gastos com nosso intuitivo aplicativo de controle
          financeiro.
        </p>
      </div>

      <div className="h-[40%] md:h-full md:w-[60%]">
        <Image
          src={'/financial-planning.png'}
          width={1000}
          height={1000}
          alt="Financial Planning"
        />
      </div>

      <div className="w-full flex items-center flex-col px-4 py-4 md:hidden">
        <p className="text-center font-semibold">Organize sua vida financeira!</p>
        <Button
          onClick={handleSignIn}
          className="w-full bg-[#2980B9] font-bold text-2xl text-white">
          ENTRE AQUI!
        </Button>
      </div>

      <div className="hidden md:flex md:flex-col md:justify-between w-[50%] h-[40rem]">
        <div className="h-[30%] p-4 self-start">
          <h1 className="text-4xl md:text-7xl font-bold">Tome controle das suas finanças!</h1>
          <p className="font-semibold text-2xl">
            Rastreie, gerencie e otimize seus gastos com nosso intuitivo aplicativo de controle
            financeiro.
          </p>
        </div>

        <div className="w-full flex items-center md:items-start flex-col px-4 py-4">
          <p className="text-center font-semibold ml-4 text-lg">Organize sua vida financeira!</p>
          <Button
            onClick={handleSignIn}
            className="w-full md:w-fit bg-[#2980B9] font-bold text-2xl md:text-3xl text-white px-12 py-8">
            ENTRE AQUI!
          </Button>
        </div>
      </div>
    </div>
  );
}
