'use client';

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { useFetchUserData } from '@/hook/useFetchUserData';
import { IUser } from '@/types/user';

import NavBar from '@/components/common/NavBar';
import DashboardMobile from '@/components/mobile/dashboardMobile/DashboardMobile';
import WelcomeHeader from '@/components/mobile/dashboardMobile/WelcomeHeader';

export default function Dashboard() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { fetchByEmail } = useFetchUserData();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    async function fetchUsername() {
      if (email) {
        const user = await fetchByEmail(email);
        setUser(user);
      }
    }
    fetchUsername();
  }, [email, fetchByEmail]);

  if (user) {
    return (
      <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
        <div className="w-full h-full overflow-y-hidden">
          <WelcomeHeader name={user.name} />
          <DashboardMobile />
        </div>
        <NavBar selectedButton={'home'} />
      </div>
    );
  }
  if (!user) {
    return <div>Loading...</div>;
  }
}
