import DashboardWrapper from '@/components/dashboard/DashboardWrapper';

interface IDashboardProps {
  searchParams: {
    u: string;
    account?: string;
    creditcard?: string;
  };
}

export default function Dashboard(props: IDashboardProps) {
  const id = props.searchParams.u;
  const accountId = props.searchParams?.account;
  const creditCardId = props.searchParams?.creditcard;

  return <DashboardWrapper userId={id} accountId={accountId} creditCardId={creditCardId} />;
}
