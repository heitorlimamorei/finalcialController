'use client';

import { useState } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import ChangeAccountModal from '@/components/changeAccountModal/ChangeAccountModal';
import ChangeCreditCardModal from '@/components/changeCreditCardModal/ChangeCreditCardModa';

export default function ChangeDashboardView() {
  const [isChangeAccountOpen, setIsChangeAccountOpen] = useState<boolean>(false);
  const [isCreditCardOpen, setIsCreditCardOpen] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get('u') ?? '';

  const toggleChangeAccountModal = () => {
    setIsChangeAccountOpen((c) => !c);
  };

  const toggleChangeCreditCardModal = () => {
    setIsCreditCardOpen((c) => !c);
  };

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
        isOpen={isChangeAccountOpen}
        onClose={toggleChangeAccountModal}
      />

      <ChangeCreditCardModal
        onChange={handleChangeCreditCard}
        isOpen={isCreditCardOpen}
        onClose={toggleChangeCreditCardModal}
      />
    </>
  );
}
