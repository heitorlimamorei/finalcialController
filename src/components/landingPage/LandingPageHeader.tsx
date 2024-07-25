import Image from 'next/image';

interface LandingPageHeaderProps {
  width: number;
}

export default function LandingPageHeader({ width }: LandingPageHeaderProps) {
  return (
    <header className="w-full h-[10%]">
      <div className="w-[30%] h-full p-3 md:w-[40%] lg:w-[25%]">
        {width > 728 ? (
          <Image
            src={'/logo-no-background-black.png'}
            width={1000}
            height={1000}
            alt="Logo financial controller"
          />
        ) : (
          <Image
            src={'/icon-black-no-bg.png'}
            width={300}
            height={300}
            alt="Icon financial controller"
          />
        )}
      </div>
    </header>
  );
}
