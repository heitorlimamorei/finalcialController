import Image from 'next/image';

import Button from '@/components/common/Button';

export default function LandingPageBody() {
  return (
    <main className="flex min-h-[90%] flex-col md:flex-row items-center justify-between">
      <div className="h-[30%] p-4 md:hidden">
        <h1 className="text-4xl font-bold">Tome controle das suas finanças!</h1>
        <p className="font-semibold">
          Rastreie, gerencie e otimize seus gastos com nosso intuitivo aplicativo de controle
          financeiro.
        </p>
      </div>
      <div className="h-[40%] md:h-full md:w-[60%]">
        <Image
          src={'/financial-planning.png'}
          width={1000}
          height={1000}
          alt="Financial Planning"
        />
      </div>
      <div className="w-full flex items-center flex-col px-4 py-4 md:hidden">
        <p className="text-center font-semibold">Organize sua vida financeira!</p>
        <Button className="w-full bg-[#2980B9] font-bold text-2xl text-white">ENTRE AQUI!</Button>
      </div>
      <div className="hidden md:flex md:flex-col md:justify-between w-[50%] h-[40rem]">
        <div className="h-[30%] p-4 self-start">
          <h1 className="text-4xl md:text-7xl font-bold">Tome controle das suas finanças!</h1>
          <p className="font-semibold text-2xl">
            Rastreie, gerencie e otimize seus gastos com nosso intuitivo aplicativo de controle
            financeiro.
          </p>
        </div>
        <div className="w-full flex items-center md:items-start flex-col px-4 py-4">
          <p className="text-center font-semibold ml-4 text-lg">Organize sua vida financeira!</p>
          <Button className="w-full md:w-fit bg-[#2980B9] font-bold text-2xl md:text-3xl text-white px-12 py-8">
            ENTRE AQUI!
          </Button>
        </div>
      </div>
    </main>
  );
}
