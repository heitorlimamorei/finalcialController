import { type ReactElement } from 'react';

import DashboardMobileBody from './DashboardMobileBody';
import DashboardMobileHeader from './DashboardMobileHeader';

interface DashboardMobilePageProps {
  name: string;
}

export default function DashboardMobilePage({ name }: DashboardMobilePageProps): ReactElement {
  return (
    <>
      <DashboardMobileHeader name={name} />
      <DashboardMobileBody />
    </>
  );
}
