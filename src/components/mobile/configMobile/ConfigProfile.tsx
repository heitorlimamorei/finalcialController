import Image from 'next/image';

export function ConfigProfile() {
  return (
    <div className="flex flex-row h-[20%] w-full items-center justify-center">
      <Image src={'/icon-black-no-bg.png'} alt="Profile picture" width={100} height={100} />
      <div className="h-full w-fit flex flex-col justify-center px-5">
        <h1 className="text-xl font-bold">Felipe Rese</h1>
        <p>feliperese2018@gmail.com</p>
      </div>
    </div>
  );
}
