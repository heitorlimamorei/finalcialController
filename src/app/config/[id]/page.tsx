import Image from 'next/image';

import NavBar from '@/components/common/NavBar';

export default function Config() {
  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
      <div className="h-full w-full">
        <div className="flex flex-row h-[20%] w-full items-center justify-center">
          <Image src={'/icon-black-no-bg.png'} alt="Profile picture" width={100} height={100} />
          <div className="h-full w-fit flex flex-col justify-center px-5">
            <h1 className="text-xl font-bold">Felipe Rese</h1>
            <p>feliperese2018@gmail.com</p>
          </div>
        </div>
      </div>
      <NavBar selectedButton="config" />
    </div>
  );
}
