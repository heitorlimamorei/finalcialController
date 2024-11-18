'use client';
import { useRouter } from 'next/navigation';

import { IUser } from '@/types/user';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

import NavBar from '@/components/common/NavBar';
import DashboardMobile from '@/components/mobile/dashboardMobile/DashboardMobile';
import WelcomeHeader from '@/components/mobile/dashboardMobile/WelcomeHeader';

interface DashboardWrapperProps {
  userId: string;
  accountId?: string;
  creditCardId?: string;
}

export default function DashboardWrapper({
  userId,
  accountId,
  creditCardId,
}: DashboardWrapperProps) {
  const { data: user, error: userError } = useSWR<IUser>(
    `/user/${userId}`,
    fetcher,
  );
  const router = useRouter();

  if (userError) {
    return <div>Error loading user data...</div>;
  }

  if (!user) return <div></div>;

  if (accountId == null && creditCardId == null) {
    router.push(`/dashboard?u=${userId}&account=wallet`);
    return null;
  }
  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black dark:bg-zinc-800 dark:text-white overflow-y-scroll">
      <div className="w-full h-full overflow-y-hidden">
        <WelcomeHeader name={user.name} />
        <DashboardMobile user={user} />
      </div>
      <NavBar
        u={userId}
        cid={creditCardId}
        acid={accountId}
        selectedButton={'home'}
      />
    </div>
  );
}
