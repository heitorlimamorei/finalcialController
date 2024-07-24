import Image from 'next/image';

export default function Loading() {
  return (
    <div className="w-[100dvw] h-[100dvh] dark:bg-zinc-800 bg-gray-100 text-black flex items-center justify-center">
      <Image src="/loading.gif" alt="loader" width={100} height={100} />
    </div>
  );
}
