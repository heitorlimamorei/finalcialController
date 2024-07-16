import NavBar from '@/components/common/NavBar';
import { ConfigProfile } from '@/components/mobile/configMobile/ConfigProfile';

export default function Config() {
  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
      <div className="h-full w-full">
        <ConfigProfile />
      </div>
      <NavBar selectedButton="config" />
    </div>
  );
}
