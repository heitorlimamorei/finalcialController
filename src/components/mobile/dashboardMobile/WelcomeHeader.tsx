interface WelcomeHeaderProps {
  name?: string;
}

export default function WelcomeHeader({ name }: WelcomeHeaderProps) {
  const date = new Date();
  const hours = date.getHours();

  const afternoon = hours > 12 && hours < 19;
  const night = hours > 19 || hours < 4;

  let welcomeMessage = 'Bom dia';
  if (afternoon) {
    welcomeMessage = 'Boa tarde';
  }
  if (night) {
    welcomeMessage = 'Boa noite';
  }

  return (
    <header className="w-full h-[10%] p-5">
      <h1 className="text-4xl font-bold">Olá {name?.split(' ')[0]}</h1>
      <p className="text-xl text-gray-500">{welcomeMessage}</p>
    </header>
  );
}
