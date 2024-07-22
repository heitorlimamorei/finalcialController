'use client';

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Ensure this import is correct

import { useFetchUserData } from '@/hook/useFetchUserData';
import axios from 'axios';

import Button from '@/components/common/Button';
import TextInput from '@/components/common/TextInput';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function UserForm() {
  const { data: session } = useSession();
  const { fetchByEmail } = useFetchUserData();
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
          const result = await fetchByEmail(email);
          if (result.email !== '') {
            console.log(result);
            router.push('/dashboard');
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
  }, [email, router, fetchByEmail, session]);

  async function Createuser() {
    try {
      await axios.post(`${api}/user`, {
        name,
        email,
      });
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="flex items-center flex-col">
        <h1 className="text-xl font-bold">Como devemos te chamar?</h1>
        <TextInput
          value={name}
          onChange={handleNameChange}
          className="w-full rounded-xl bg-gray-200 border-[2px] border-gray-500"
        />
        <Button
          onClick={Createuser}
          className="flex items-center justify-center mt-4 bg-green-500 h-[2rem] text-center font-bold text-white">
          Salvar
        </Button>
      </div>
    </div>
  );
}
