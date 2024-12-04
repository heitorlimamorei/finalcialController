import Image from 'next/image';

export default function LandingPageHeader() {
  return (
    <header className="sticky top-0 p-1 bg-gray-100 w-full h-[10%]">
      <div className="flex items-center w-[20%] h-full md:w-[40%] lg:w-[25%]">
        <Image
          src={'/logo-no-background-black.png'}
          width={1000}
          height={1000}
          className="hidden md:flex"
          alt="Logo financial controller"
        />
        <Image
          src={'/icon-black-no-bg.png'}
          width={300}
          height={300}
          className="flex md:hidden"
          alt="Icon financial controller"
        />
      </div>
    </header>
  );
}
