import { useFetchUserData } from '@/hook/useFetchUserData';
import { IUser } from '@/types/user';

import NavBar from '@/components/common/NavBar';
import { ConfigProfile } from '@/components/mobile/configMobile/ConfigProfile';

interface IConfigProps {
  searchParams: {
    u: string;
  };
}

export default async function Config(props: IConfigProps) {
  const { fetchUser } = useFetchUserData();
  const user: IUser = await fetchUser(props.searchParams.u);
  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
      <div className="h-full w-full">
        <ConfigProfile user={user} />
      </div>
      <NavBar user={user} selectedButton="config" />
    </div>
  );
}
