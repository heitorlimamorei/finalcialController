'use client';

import NavBar from '@/components/common/NavBar';
import DashboardMobilePage from '@/components/mobile/dashboardMobile/DashboardMobilePage';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
      <DashboardMobilePage name="Felipe Rese" />
      <NavBar selectedButton={'home'} />
    </div>
  );
}
