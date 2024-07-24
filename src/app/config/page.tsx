import { IUser } from '@/types/user';
import axios from 'axios';

import NavBar from '@/components/common/NavBar';
import { ConfigProfile } from '@/components/mobile/configMobile/ConfigProfile';

interface IConfigProps {
  searchParams: {
    u: string;
  };
}

const api = process.env.NEST_PUBLIC_API_URL;

export default async function Config(props: IConfigProps) {
  const resp = await axios.get(`${api}/user/${props.searchParams.u}`);
  const user: IUser = resp.data;
  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
      <div className="h-full w-full">
        <ConfigProfile user={user} />
      </div>
      <NavBar user={user} selectedButton="config" />
    </div>
  );
}
