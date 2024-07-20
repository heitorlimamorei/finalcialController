'use client';
import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useFetchUserData } from '@/hook/useFetchUserData';
import useWindowSize from '@/hook/useWindowSize';
import axios, { AxiosError } from 'axios';

import LandingPageBody from '@/components/landingPage/LandingPageBody';
import LandingPageHeader from '@/components/landingPage/LandingPageHeader';

interface IUser {
  name: string;
  email: string;
}

export default function Home() {
  const { width } = useWindowSize();
  const { data: session } = useSession();
  const { fetchByEmail } = useFetchUserData();
  const email = session?.user?.email;
  const router = useRouter();

  useEffect(() => {
    if (session != null) {
      const fetchData = async (email: string) => {
        try {
          const result = await fetchByEmail(email);
          if (result.email != '') {
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
      if (email) {
        fetchData(email);
      }
    }
  }, [email, router, fetchByEmail, session]);

  return (
    <div className="relative w-full h-screen bg-gray-100 text-black">
      <LandingPageHeader width={width} />
      <LandingPageBody />
    </div>
  );
}
