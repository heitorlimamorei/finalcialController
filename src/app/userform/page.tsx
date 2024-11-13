'use client';

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import axios from 'axios';

import Button from '@/components/common/Button';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function UserForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const email = session?.user?.email;
  const [name, setName] = useState<string>('');

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  useEffect(() => {
    if (session && email) {
      const fetchData = async (email: string) => {
        try {
          const result = await axios.get(`${api}/user?email=${email}`);
          const user = result.data;
          if (user.email !== '') {
            router.push('/');
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
              router.push('/userform');
            }
          }
          console.error(error);
        }
      };
      fetchData(email);
    }
  }, [email, session]);

  async function CreateWallet(userId: string): Promise<void> {
    try {
      await axios.post(`${api}/account`, {
        nickname: 'carteira',
        financial_institution: 'wallet',
        ownerId: userId,
        balance: 0,
      });
    } catch (error) {
      console.error('Failed to create wallet:', error);
    }
  }

  async function Createuser() {
    try {
      const resp = await axios.post(`${api}/user`, {
        name,
        email,
      });

      const userId = resp.data;

      await CreateWallet(userId);

      router.push('/');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="flex items-center flex-col">
        <h1 className="text-xl font-bold mb-4">Como devemos te chamar?</h1>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full bg-zinc-300 rounded-lg h-8 px-2 py-1"
        />
        <Button
          onClick={Createuser}
          className="flex items-center justify-center mt-4 bg-green-500 h-[2rem] text-center font-bold text-white w-full">
          Salvar
        </Button>
      </div>
    </div>
  );
}
