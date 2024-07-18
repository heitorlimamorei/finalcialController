'use client';

import NavBar from '@/components/common/NavBar';
import DashboardMobile from '@/components/mobile/dashboardMobile/DashboardMobile';
import WelcomeHeader from '@/components/mobile/dashboardMobile/WelcomeHeader';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
      <div className="w-full h-full overflow-y-hidden">
        <WelcomeHeader name={'Felipe Rese'} />
        <DashboardMobile />
      </div>
      <NavBar selectedButton={'home'} />
    </div>
  );
}
