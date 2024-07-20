'use client';

import { useState } from 'react';

import { useSession } from 'next-auth/react';

import axios from 'axios';

import Button from '@/components/common/Button';
import TextInput from '@/components/common/TextInput';

const api = 'https://financial-controller-backend.onrender.com';

export default function UserForm() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [name, setName] = useState<string>('');
  function handleNameChange(e: any) {
    setName(e.target.value);
  }
  async function Createuser() {
    const resp = axios.post(`${api}/api/v1/user`, {
      name,
      email,
    });
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="flex items-center flex-col">
        <h1 className=" text-xl font-bold">Como devemos te chamar?</h1>
        <TextInput
          value={name}
          onChange={handleNameChange}
          className="w-full rounded-xl bg-gray-200 border-[2px] border-gray-500"
        />
        <Button
          onClick={() => {
            Createuser();
          }}
          className="flex items-center justify-center mt-4 bg-green-500 h-[2rem] text-center font-bold text-white">
          Salvar
        </Button>
      </div>
    </div>
  );
}
