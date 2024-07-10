'use client';
import { useState, useEffect } from 'react';

import Image from 'next/image';

import useWindowSize from '@/hook/useWindowSize';

import DashboardMobilePage from '@/components/dashboardMobile/DashboardMobilePage';
import NavBar from '@/components/NavBar';

export default function Dashboard() {
  const { width } = useWindowSize();

  const [selectedButton, setSelectedButton] = useState<string>(() => {
    // Persists the state even on reloads
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedButton') || 'home';
    }
    return 'home';
  });

  useEffect(() => {
    // Changes the local variable
    localStorage.setItem('selectedButton', selectedButton);
  }, [selectedButton]);

  function handleSelectButton(id: string) {
    setSelectedButton(id);
  }
  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
      {selectedButton === 'home' && width < 768 ? <DashboardMobilePage name="Felipe Rese" /> : null}
      {selectedButton === 'config' ? (
        <div className="h-full w-full">
          <div className="flex flex-row h-[20%] w-full items-center justify-center">
            <Image src={'/icon-black-no-bg.png'} alt="Profile picture" width={100} height={100} />
            <div className="h-full w-fit flex flex-col justify-center px-5">
              <h1 className="text-xl font-bold">Felipe Rese</h1>
              <p>feliperese2018@gmail.com</p>
            </div>
          </div>
        </div>
      ) : null}
      <NavBar selectedButton={selectedButton} handleSelectButton={handleSelectButton} />
    </div>
  );
}
