'use client';
import useWindowSize from '@/hook/useWindowSize';

import LandingPageBody from '@/components/landingPage/LandingPageBody';
import LandingPageHeader from '@/components/landingPage/LandingPageHeader';

export default function Home() {
  const { width } = useWindowSize();
  return (
    <div className="relative w-full h-screen bg-gray-100 text-black">
      <LandingPageHeader width={width} />
      <LandingPageBody />
    </div>
  );
}
