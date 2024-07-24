'use client';
import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useWindowSize from '@/hook/useWindowSize';
import { IUser } from '@/types/user';
import axios from 'axios';

import LandingPageBody from '@/components/landingPage/LandingPageBody';
import LandingPageHeader from '@/components/landingPage/LandingPageHeader';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const { width } = useWindowSize();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const router = useRouter();

  useEffect(() => {
    if (session != null) {
      const fetchData = async (email: string) => {
        try {
          const resp = await axios.get(`${api}/user?email=${email}`);
          const user: IUser = resp.data;
          if (user?.email != '') {
            router.push(`/dashboard?u=${user.id}`);
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
  }, [email, session]);

  return (
    <div className="relative w-full h-screen bg-gray-100 text-black">
      <LandingPageHeader width={width} />
      <LandingPageBody />
    </div>
  );
}
