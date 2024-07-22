import { useFetchUserData } from '@/hook/useFetchUserData';
import { IUser } from '@/types/user';

import NavBar from '@/components/common/NavBar';
import DashboardMobile from '@/components/mobile/dashboardMobile/DashboardMobile';
import WelcomeHeader from '@/components/mobile/dashboardMobile/WelcomeHeader';

interface IDashboardProps {
  searchParams: {
    u: string;
  };
}

export default async function Dashboard(props: IDashboardProps) {
  const { fetchUser } = useFetchUserData();
  const id = props.searchParams.u;

  let user: IUser = await fetchUser(id);
  user.personalSheetId = 'KboTREeG7JAHeFLpdGqO';

  if (user) {
    return (
      <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black overflow-y-scroll">
        <div className="w-full h-full overflow-y-hidden">
          <WelcomeHeader name={user.name} />
          <DashboardMobile user={user} />
        </div>
        <NavBar user={user} selectedButton={'home'} />
      </div>
    );
  }
  if (!user) {
    return <div>Loading...</div>;
  }
}
