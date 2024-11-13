'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import ChangeAccountModal from '@/components/changeAccountModal/ChangeAccountModal';
import ChangeCreditCardModal from '@/components/changeCreditCardModal/ChangeCreditCardModa';

interface IChangeDashboardView {
  isChangeAccountOpen: boolean;
  isCreditCardOpen: boolean;
  toggleChangeCreditCardModal: () => void;
  toggleChangeAccountModal: () => void;
}

export default function ChangeDashboardView(props: IChangeDashboardView) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get('u') ?? '';

  const handleChangeAccount = (acid: string) => {
    router.push(`/dashboard?u=${userId}&account=${acid}`);
  };

  const handleChangeCreditCard = (cid: string) => {
    router.push(`/dashboard?u=${userId}&creditcard=${cid}`);
  };

  return (
    <>
      <ChangeAccountModal
        onChange={handleChangeAccount}
        isOpen={props.isChangeAccountOpen}
        onClose={props.toggleChangeAccountModal}
      />

      <ChangeCreditCardModal
        onChange={handleChangeCreditCard}
        isOpen={props.isCreditCardOpen}
        onClose={props.toggleChangeCreditCardModal}
      />
    </>
  );
}
